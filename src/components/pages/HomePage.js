import React from "react"
import { Container, Button, ButtonGroup } from "reactstrap";

import Arweave from "arweave/web";
const arweave = Arweave.init({});

export default class HomePage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            key: "",
            address: "",
            status: ""
        }
        this.generateWallet = this.generateWallet.bind(this)
        this.getBalance = this.getBalance.bind(this)
        this.getAddress = this.getAddress.bind(this)
        this.getStatus = this.getStatus.bind(this)
    }

    getAddress = () => {
        arweave.wallets.jwkToAddress(this.state.key).then((add) => {
            console.log(add)
            this.setState({ address: add })
        })
    }
    getBalance = () => {
        arweave.wallets.getBalance(this.state.address).then((balance) => {
            let winston = balance;
            let ar = arweave.ar.winstonToAr(balance)

            console.log(winston);
            console.log(ar);
        })
    }
    generateWallet = () => {
        arweave.wallets.generate().then((jwt) => {
            console.log(jwt)

            this.setState({ key: jwt })

        })
    }
    getStatus = () => {
        fetch('https://arweave.net/info')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)

                this.setState({ status: data })
            })
    }
    componentDidMount() {
        this._isMounted = true;
        this.getStatus() 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <Container>
                <h1>Arweave Test</h1>
                <br />
                <h3>Network status:</h3>
                <p>Height: {this.state.status.height}</p>
                <p>Peers: {this.state.status.peers}</p>
                <p>Current: {this.state.status.current}</p>
                <ButtonGroup>
                    <Button onClick={this.generateWallet}>Generate Wallet</Button>
                    <Button onClick={this.getAddress}>Get Address</Button>
                    <Button onClick={this.getBalance}>Get Balance</Button>
                    <Button onClick={this.getStatus}>Get Status</Button>
                </ButtonGroup>
                <p>{this.state.key.n}</p>
                <p>{this.state.address}</p>
            </Container>
        )
    }
}
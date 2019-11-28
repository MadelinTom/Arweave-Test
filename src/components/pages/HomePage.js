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
            status: "",
            winston: "",
            ar: "",
        }
        this.generateWallet = this.generateWallet.bind(this)
        this.getBalance = this.getBalance.bind(this)
        this.getAddress = this.getAddress.bind(this)
        this.getStatus = this.getStatus.bind(this)
    }

    getAddress = wallet => {
        arweave.wallets.jwkToAddress(wallet).then((add) => {
            console.log(add)
            this.setState({ address: add })
        })
        .then(() => {
            this.getBalance()
        })
    }
    getBalance = () => {
        arweave.wallets.getBalance(this.state.address).then((balance) => {
            let winston = balance;
            let ar = arweave.ar.winstonToAr(balance)
            this.setState({
                winston: winston,
                ar: ar
            })
            console.log(this.state.winston);
            console.log(this.state.ar);
        })
    }
    generateWallet = () => {
        arweave.wallets.generate().then((jwt) => {
            console.log(jwt)
            this.setState({ key: jwt })
        })
            .then(() => {
                this.getAddress(this.state.key)
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
                <p>Blocks: {this.state.status.blocks}</p>
                <p>Height: {this.state.status.height}</p>
                <p>Peers: {this.state.status.peers}</p>
                <p>Current block: {this.state.status.current}</p>
                <ButtonGroup>
                    <Button onClick={this.getStatus}>Get Arweave Status</Button>
                    <Button onClick={this.generateWallet}>Generate Wallet</Button>
                    <Button onClick={this.getBalance}>Get Balance</Button>
                </ButtonGroup>
                <p>{this.state.address}</p>
                <p>Winston: {this.state.winston}</p>
                <p>Ar: {this.state.ar}</p>
            </Container>
        )
    }
}
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
            address: ""
        }
        this.generateWallet = this.generateWallet.bind(this)
        this.getBalance = this.getBalance.bind(this)
        this.getAddress = this.getBalance.bind(this)
    }

    getAddress = key => {
        arweave.wallets.jwkToAddress(key).then((address) => {
            console.log(address)
            this.setState({ address: address })
        })
    }
    getBalance = address => {
        arweave.wallets.getBalance(address).then((balance) => {
            let winston = balance;
            let ar = arweave.ar.winstonToAr(balance)

            console.log(winston);
            console.log(ar);
        })
    }
    generateWallet = () => {
        arweave.wallets.generate().then((jwt) => {
            console.log(jwt)
            if (this._isMounted) {
                this.setState({ key: jwt })
            }
            return jwt;
        })
    }
    getStatus = () => {
        fetch('https://arweave.net/info')
            .then((res) => res.json())
            .then(function (data) {
                console.log(data)
            })
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        return (
            <Container>
                <h1>Arweave Test</h1>
                <br />
                <ButtonGroup>
                    <Button onClick={this.generateWallet}>Generate Wallet</Button>
                    <Button onClick={this.getAddress}>Get Address</Button>
                    <Button onClick={this.getBalance}>Get Balance</Button>
                    <Button onClick={this.getStatus}>Get Status</Button>
                </ButtonGroup>
                <p>{this.state.address}</p>
            </Container>
        )
    }
}
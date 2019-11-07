import React from "react"
import { Container } from "reactstrap";

import Arweave from "arweave/web";
const arweave = Arweave.init();

export default class HomePage extends React.Component {
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

    componentDidMount() {
        this.generateWallet().then((key) => {
            this.getAddress(key).then((address) => {
                this.getBalance(address)
            })
        })
    }
    getAddress = key => {
        arweave.wallets.jwkToAddress(key).then((address) => {
            this.setState({ address: address })
            return address;
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
            this.setState({ key: jwt })
            return jwt;
        })
    }

    render() {
        return (
            <Container>
                <h1>Test</h1>
            </Container>
        )
    }
}
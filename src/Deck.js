import React, { Component } from 'react'
import axios from "axios";
import Card from "./Card"
import "./Deck.css"
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";


class Deck extends Component{
    constructor(props){
        super(props);
        this.state = {deck : null, drawn: []}; 
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount(){
        let data = await axios.get(`${API_BASE_URL}new/shuffle`);
        this.setState({ deck: data.data })
    }

    async getCard(){
        const {deck} = this.state;
        let cardUrl = `${API_BASE_URL}${deck.deck_id}/draw/`

        try{
            let cardObj = await axios.get(cardUrl);
            let card = cardObj.data;
            if (!card.success){
                throw new Error("No card remaining!");
            }
            this.setState(curState => ({
                drawn: [
                    ...curState.drawn, 
                    {
                        id: card.cards[0].code,
                        image: card.cards[0].image,
                        name: `${card.cards[0].value} of ${card.cards[0].suit}`
                    }
                ]
            }));
        } catch(err){
            alert(err);
        }
    }    

    render(){
        let cards = this.state.drawn.map(card => {
            return <Card name = {card.name} image = {card.image} key = {card.id}/>
        })
        return(
            <div className = "Deck">
                <h1 className = "Deck-title">🔸 Card Dealer 🔸</h1>
                <h2 className = "Deck-title subtitle">🔸 A little demo made with React 🔸</h2>
                <button className = "Deck-btn" onClick = {this.getCard}>Get Card</button>
                <div className = "Deck-cardarea">{cards}</div>
            </div>
        )
    }
}

export default Deck;
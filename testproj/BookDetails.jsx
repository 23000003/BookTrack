import { useState } from "react";


export default function BookDetails(props){

    return(
        <>
        <div className="BookDetailsContainer">
        <hr style={{margin: "0px 10%"}}/>
            <div className="Book-Details">
                <span className="Back-Button">  Back</span>
                <div className="left-details">
                    <div className="book-title">
                        <h2>{props.book_title}</h2>
                        <p>Posted By: {props.account_name}</p>
                        <p>Location: <a href={props.Location_tag} target="_blank">{props.Location}</a></p>
                    </div>
                    <div className="left-img">
                        <img src={props.imagetag} alt="Fullmetal Alchemist Vol. 1"/>
                    </div>
                    <div className="book-description">
                        <p>Author: {props.book_author}.</p>
                        <p>Sypnosis:</p>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-container">
                        <div className="price-details">
                            <span>Item #{props.id}<span className="item-process">In Process: {props.in_process}</span></span> {/**Needs process functionality */}
                            <h2>₱{props.book_price}.00</h2>
                            <div className="Qty">
                                <p>Qty: {props.book_quantity}</p>
                                <button className="qty" style={{borderRight: "0px", cursor: "pointer"}}>-</button>
                                <span>1</span> {/**Needs state variable functionality */}
                                <button className="qty" style={{borderLeft: "0px", cursor: "pointer"}}>+</button>
                                <br/>
                                <button className="Buy">Buy Now</button>
                            </div>
                        </div>
                        <hr style={{marginTop: "25px"}}/>
                        <div className="payment-details">
                            <p>You can pay through: </p>
                            <img src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/7f0a967992d03dc98fc6e933bba31495.jpg"/>
                            <img src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/0fa8a536f9645079c15d9ec2fd763a56.jpg"/>
                        </div>
                        <hr style={{marginTop: "15px"}}/>
                        <div className="notice-details">
                            <p>NOTICE: </p>
                            <p style={{marginTop: "15px"}}>This website cannot guarantee the safety of your funds.</p>
                            <p style={{marginTop: "23px"}}>This Book is available in the store you can either buy 
                                the book online to reserve it for you or go to the physical store to buy it. 
                                You must have your Reference ID after buying with other payment methods to claim 
                                your Book.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

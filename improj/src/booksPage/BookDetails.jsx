import React from 'react';

export default function BookDetails(props) {
    const { DisplayDets, book_title, account_name, 
            Location_tag, Location, imagetag, book_author, 
            description, id, in_process, book_price, book_quantity } = props;

    return (
        <div className="BookDetailsContainer">
            <hr style={{ margin: '0px 10%' }} />
            <div className="Book-Details">
                <span className="Back-Button" onClick={DisplayDets}>Back</span>
                <div className="left-details">
                    <div className="book-title">
                        <h2>{book_title}</h2>
                        <p>Posted By: {account_name}</p>
                        <p>Location: <a href={Location_tag} target="_blank">{Location}</a></p>
                    </div>
                    <div className="left-img">
                        <img src={imagetag} alt="Book" />
                    </div>
                    <div className="book-description">
                        <p>Author: {book_author}.</p>
                        <p>Sypnosis:</p>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-container">
                        <div className="price-details">
                            <span>Item #{id}<span className="item-process">In Process: {in_process}</span></span>
                            <h2>₱{book_price}.00</h2>
                            <div className="Qty">
                                <p>Qty: {book_quantity}</p>
                                <button className="qty" style={{ borderRight: '0px', cursor: 'pointer' }}>-</button>
                                <span>1</span>
                                <button className="qty" style={{ borderLeft: '0px', cursor: 'pointer' }}>+</button>
                                <br />
                                <button className="Buy">Buy Now</button>
                            </div>
                        </div>
                        <hr style={{ marginTop: '25px' }} />
                        <div className="payment-details">
                            <p>You can pay through: </p>
                            <img src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/7f0a967992d03dc98fc6e933bba31495.jpg" alt="Payment Method 1" />
                            <img src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/0fa8a536f9645079c15d9ec2fd763a56.jpg" alt="Payment Method 2" />
                        </div>
                        <hr style={{ marginTop: '15px' }} />
                        <div className="notice-details">
                            <p>NOTICE: </p>
                            <p style={{ marginTop: '15px' }}>This website cannot guarantee the safety of your funds.</p>
                            <p style={{ marginTop: '23px' }}>This Book is available in the store you can either buy the book online to reserve it for you or go to the physical store to buy it. You must have your Reference ID after buying with other payment methods to claim your Book.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

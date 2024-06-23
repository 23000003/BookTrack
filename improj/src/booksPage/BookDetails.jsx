import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function BookDetails({DisplayDets, ...passDets}) {

    const navigate = useNavigate();
    const [Payment, PaymentState] = useState(false);
    const [top, setTop] = useState('20%');
    const [height, setHeight] = useState('200px');
    const [Choose, SetChoose] = useState(true);
    const [PaymentMethod, SetPaymentMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isChecked, setIsChecked] = useState(true);
    const [pass, setPass] = useState(passDets);
    const [totalPrice, setTotalPrice] = useState(passDets.book_price);

    console.log(pass)

    const QuantityAdd = () =>{
        if(quantity < passDets.book_quantity){
            setQuantity(quantity => quantity + 1);
            setTotalPrice(totalPrice => totalPrice + passDets.book_price);
        }
    }

    const QuantityMinus = () =>{
        if(quantity !== 1){
            setQuantity(quantity => quantity - 1);
            setTotalPrice(totalPrice => totalPrice - passDets.book_price);
        }
    }

    const gcashMethod = () =>{
        SetPaymentMethod('Gcash');
        SetChoose(false);
        setHeight('730px')
        setTop('33.4%')
    }

    const CashOnDelivery = () =>{
        SetPaymentMethod('COD');
        SetChoose(false);
        setHeight('370px')
        setTop('25.4%')
    }

    const paymentTrigger = () =>{
        PaymentState(!Payment);
        document.body.style.overflow = 'hidden';
    }

    const returnBackDisplay = () =>{
        PaymentState(false);
        setTop('20%');
        setHeight('200px');
        SetChoose(true);
        SetPaymentMethod();
        document.body.style.overflow = 'auto';
    }

    return (
        <>
        <div className="BookDetailsContainer">
            <hr style={{ margin: '0px 10%' }} />
            <div className="Book-Details">
                <span className="Back-Button" onClick={DisplayDets}>Back</span>
                <div className="left-details">
                    <div className="book-title">
                        <h2>{passDets.book_title}</h2>
                        <p>Posted By: 
                            <span onClick={() =>{navigate('/UserProfile', {state: {passDets}})}}>{passDets.account_name}</span>
                        </p>
                        <p>Location: <a href={passDets.location_tag} target="_blank">{passDets.location}</a></p>
                    </div>
                    <div className="left-img">
                        <img src={passDets.imagetag} alt="Book" />
                    </div>
                    <div className="book-description">
                        <p>Author: {passDets.author}.</p>
                        <p>Sypnosis:</p>
                        <p>{passDets.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-container">
                        <div className="price-details">
                            <span>Item #{passDets.id}<span className="item-process">In Process: {passDets.in_process}</span></span>
                            <h2 className='priceh2'>₱{totalPrice}.00</h2>
                            <div className="Qty">
                                <p className='Quantity-1'>Qty: {passDets.book_quantity}</p>
                                <button className="qty" style={{ borderRight: '0px', cursor: 'pointer' }} onClick={() => QuantityMinus()}>-</button>
                                <span className='quantityidentifier'>{quantity}</span>
                                <button className="qty" style={{ borderLeft: '0px', cursor: 'pointer' }} onClick={() => QuantityAdd()}>+</button>
                                <br />
                                <button className="Buy Buy-hover" onClick={() => paymentTrigger()}>Buy Now</button>
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
        
        {Payment && 
        <>
            <div className="Buy-Display1" onClick={() => returnBackDisplay()}></div>
            <div className="Buy-Display" style={{height: height, top: top}}>
                
                {Choose &&
                    <div className="Payment-Contents">
                        <h3>Select Payment Method</h3>
                        <hr/>
                        <div className="Methods">
                            <div className="Gcash" onClick={() => gcashMethod()}> {/**onclick="gcashMethod()" */}
                                <p>Gcash</p>
                            </div>
                            <div className="COD" onClick={() => CashOnDelivery()}> {/**onclick="codMethod()" */}
                                <p>Cash on Delivery</p>
                            </div>
                        </div>
                    </div>
                }

                {PaymentMethod === 'Gcash' && (
                    <div className="gcash-content">
                        <h3 style={{marginTop: "25px"}}>LIBRARY GCASH DETAILS</h3>
                        <div>
                            <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/GCash.png?t=2024-05-29T10%3A48%3A45.460Z" alt="" style={{maxWidth: "50%", maxHeight: "50%", objectFit: "cover"}}/>
                        </div>
                        <p id="phonenumber">099-5281-3643</p>
                        <div className="amount-paying">
                            <p className="paying-amount">Amount: ₱{totalPrice}.00</p>
                            <p id="delivery-fee" style={{marginLeft: "15px", display: "none"}}>+ 50 Delivery Fee</p>
                        </div>
                        <div className="choices-type">
                            <input type="checkbox" id="pickup-choice" defaultChecked/><label>Pick up</label> {/**onclick="pickup()" */}
                            <input type="checkbox" id="delivery-choice" style={{marginLeft: "55px"}}/><label>Delivery</label> {/* onclick="delivery()"* */}
                        </div>
                        <div className="gcash-text">
                            <input type="text" placeholder="Input Reference Number"/>
                            <div className="gcash-text2">
                                <input type="text" style={{marginRight: "5px"}} placeholder="First Name"/>
                                <input type="text" style={{marginRight: "5px"}} placeholder="Last Name"/>
                            </div>
                            <input type="text" placeholder="Contact Number"/>
                            <input type="text" id="delivery-location" placeholder="Location" disabled/>
                            <div>
                                <button id="BuyItem1">Done</button> {/**onclick="buyitem() */}
                            </div>
                        </div>
                    </div>
                )}
                
                {PaymentMethod === 'COD' &&(
                    <div className="cod-content">
                        <h3 style={{marginTop: "35px"}}>CASH ON DELIVERY</h3>
                        <div className="cod-text">
                            <div className="amount-paying">
                                <p className="paying-amount">Amount: ₱{price}.00</p>
                                <p style={{marginLeft: "15px"}}>+ 50 Delivery Fee</p>
                            </div>
                            <div className="cod-text2">
                                <input type="text" style={{marginRight: "5px"}} placeholder="First Name"/>
                                <input type="text" style={{marginRight: "5px"}}  placeholder="Last Name"/>
                            </div>
                            <input type="text" placeholder="Contact Number"/>
                            <input type="text" placeholder="Location"/>
                            <div>
                                <button id="BuyItem2">Done</button> {/**onclick="buyitem() */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </>
            }

        </>
    );
}
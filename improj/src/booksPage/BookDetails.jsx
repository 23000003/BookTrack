import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../Supabase/Supabase';
import gcash from '../assets/GCash.png'
import useBuyItem from './BuyitemHook';


export default function BookDetails() {

    const location = useLocation();
    const [passDets, setPassDets] = useState(location.state.book);

    // If no input it will reset back the prices quantity to normal
    // if refresh, it will not load the current progress (in_process)
    
    // if same book that he bought, it should not be inserted but rather update its quantity

    useEffect(() =>{ // try to improve this (second ' // ' )
        const retrieve = async () =>{
            const {data, error} = await supabase
            .from('books')
            .select()
            .eq('id', passDets.id)
            .single()

            setPassDets(data)
        }
        retrieve();
        console.log("HEY", passDets)
    },[])


    useEffect(() => {
        const subscription = supabase
            .channel('books')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'books'
            }, (payload) => {
                console.log(payload);
                setPassDets(payload.new);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };

    }, [setPassDets]);

    console.log(passDets);

    const navigate = useNavigate();
    const [Payment, PaymentState] = useState(false);
    const [top, setTop] = useState('20%');
    const [height, setHeight] = useState('200px');
    const [Choose, SetChoose] = useState(true);
    const [PaymentMethod, SetPaymentMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(passDets.book_price);

    const pickupRef = useRef(null);
    const deliveryRef = useRef(null);
    const refLoc = useRef(null);

    const handlePickupChange = () => {
        if (pickupRef.current.checked) {
            setIsChecked('pickup')
            deliveryRef.current.checked = false;
            refLoc.current.disabled = true;
        }
    };
    
    const handleDeliveryChange = () => {
        if (deliveryRef.current.checked) {
            pickupRef.current.checked = false;
            setIsChecked('delivery')
            refLoc.current.disabled = false;
        }
    };
    
    const { 
        BuyItemTrigger,
        setReferenceNo,
        setFirstname,
        setLastName,
        setIsChecked,
        setContactNo,
        setLocation 
    } = useBuyItem();


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
        <div className="BookDetailsContainer" style={{marginTop: "100px"}}>
            <hr style={{ margin: '0px 10%' }} />
            <div className="Book-Details">
                <span className="Back-Button" onClick={() => navigate('/books')}>Back</span>
                <div className="left-details">
                    <div className="book-title">
                        <h2>{passDets.book_title}</h2>
                        <p>Posted By: 
                            <span onClick={() =>{navigate(`/${passDets.account_name}?Profile`, {state: {passDets}})}}>{passDets.account_name}</span>
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

                            <span>Item #{passDets.id}
                                {passDets.in_process !== 0 && (
                                    <span className="item-process">In Process: {passDets.in_process}</span>
                                )}
                            </span>

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
                            <img 
                                src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/7f0a967992d03dc98fc6e933bba31495.jpg" 
                                alt="Payment Method 1"
                                style={{marginLeft: "20px"}} 
                            />
                            <img 
                                src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/0fa8a536f9645079c15d9ec2fd763a56.jpg" 
                                alt="Payment Method 2" 
                            />
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
                            <img src={gcash} alt="" style={{maxWidth: "50%", maxHeight: "50%", objectFit: "cover"}}/>
                        </div>
                        <p id="phonenumber">099-5281-3643</p>
                        <div className="amount-paying">
                            <p className="paying-amount">Amount: ₱{totalPrice}.00</p>
                            <p id="delivery-fee" style={{marginLeft: "15px", display: "none"}}>+ 50 Delivery Fee</p>
                        </div>

                        <div className="choices-type">
                            <input
                                type="checkbox"
                                id="pickup-choice"
                                ref={pickupRef}
                                defaultChecked
                                onChange={handlePickupChange}
                            />
                            <label htmlFor="pickup-choice">Pick up</label>
                            <input
                                type="checkbox"
                                id="delivery-choice"
                                ref={deliveryRef}
                                style={{ marginLeft: "55px" }}
                                onChange={handleDeliveryChange}
                            />
                            <label htmlFor="delivery-choice">Delivery</label>
                        </div>
                        <div className="gcash-text">
                            <input type="text" 
                                    placeholder="Input Reference Number" 
                                    onChange={(e) => setReferenceNo(e.target.value)}
                            />
                            <div className="gcash-text2">
                                <input type="text" 
                                        style={{marginRight: "5px"}} 
                                        placeholder="First Name"
                                        onChange={(e) => setFirstname(e.target.value)}        
                                />
                                <input type="text" 
                                        style={{marginRight: "5px"}} 
                                        placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                                <input type="text" 
                                        placeholder="Contact Number"
                                        onChange={(e) => setContactNo(e.target.value)}
                                />
                                <input type="text" 
                                        id="delivery-location" 
                                        placeholder="Location" 
                                        onChange={(e) => setLocation(e.target.value)}
                                        ref={refLoc}
                                        disabled
                                />
                            <div>
                                <button id="BuyItem1" 
                                    onClick={() => 
                                    {BuyItemTrigger(
                                        quantity, 
                                        passDets.book_quantity, 
                                        passDets.id,
                                        passDets.in_process,
                                        passDets.account_name,
                                        totalPrice
                                    ), 
                                    setTotalPrice(passDets.book_price),
                                    setQuantity(1)
                                    }}>
                                    Done
                                </button> {/**onclick="buyitem() */}
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
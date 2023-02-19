import React from "react";
import './LoansHero.css';
import TextInput from "../../TextInput/TextInput";
import Loans from "../../DataTables/Loans";
import Button from "../../Button/Button";
import { useState } from "react";

const LoansHero = () =>{
    const [assign, setAssign] = useState("");
    const [amount, setAmount] = useState("");
    const [approval, setApproval] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loanDesc, setLoanDesc] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className="loans_container">
                <div className="loan-form">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Assign To:</label>
                            <TextInput 
                                type="text"
                                value={assign}
                                onChange={(e) => setAssign(e.target.value)}
                                required={true}
                            />
                            <TextInput 
                                type="text"
                                value={assign}
                                onChange={(e) => setAssign(e.target.value)}
                                required={true}
                            />
                            <TextInput 
                                type="text"
                                value={assign}
                                onChange={(e) => setAssign(e.target.value)}
                                required={true}
                            />
                            <TextInput 
                                type="text"
                                value={assign}
                                onChange={(e) => setAssign(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Amount:</label>
                            <TextInput 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Approval Date:</label>
                            <TextInput 
                                type="date"
                                value={approval}
                                onChange={(e) => setApproval(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Duration:</label>
                            <div className="duration">
                                <div className="from">
                                    <TextInput 
                                        type="text"
                                        value={from}
                                        placeholder="From"
                                        onChange={(e) => setFrom(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className="to">
                                <TextInput 
                                        type="text"
                                        value={to}
                                        placeholder="To"
                                        onChange={(e) => setTo(e.target.value)}
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Loan Details:</label>
                            <textarea name="" value={loanDesc} onChange={(e) => setLoanDesc(e.target.value)} id="" cols="30" rows="2"></textarea>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
                <div className="loan-table">
                    <Loans />
                </div>
            </div>
        </>
    )
}

export default LoansHero;
import React from "react";
import './PayrollHero.css';
import {Link} from 'react-router-dom';

const PayrollHero = () =>{
    return(
        <>
            <div className="Payroll-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Name</th>
                                <th>Enrollment DATE</th>
                                <th>Loans</th>
                                <th>Annual Gross Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>NGN 100,00</td>
                                <td>NGN 2,000,000</td>
                                <td><Link to='/employee_payroll/0001' className="salary">Salary</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default PayrollHero;
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import format from "date-fns/format";

import ContentPageLayout from '../../components/layouts/contentPageLayout';

import { accountActivity } from '../../lib/activities'
import { getInvoiceThunk, getTransactionsThunk, setCheckoutPlan } from '../../reduxStore/accountSlice';

import { debugLog } from '../../lib/helper'

export default function Payment() {
    const debugOn = true;

    const router = useRouter();
    const dispatch = useDispatch();

    const [plan, setPlan] = useState('yearly');

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const invoice = useSelector(state => state.account.invoice);
    const transactions = useSelector(state => state.account.transactions);

    const dueTime = invoice && invoice.dueTime;
    const dues = invoice && invoice.dues;
    const planOptions = invoice && invoice.planOptions;
    const storageUsage = invoice && invoice.monthlyInvoice.storageUsage;
    const requiredStorage = invoice && invoice.monthlyInvoice.requiredStorage;
    const monthlyPrice = invoice && invoice.monthlyInvoice.monthlyPrice;
    const currency = invoice && invoice.monthlyInvoice.currency;

    const remainingDays = invoice && invoice.remainingDays;
    const upgradePrice = invoice && invoice.upgradePrice;
    const waived = invoice && invoice.waived;

    let storageUsageString;
    if (storageUsage === 0) {
        storageUsageString = '0.000 MB';
    } else if (storageUsage) {
        if (storageUsage < 1000000) {
            storageUsageString = (storageUsage / (1000000)).toFixed(3) + ' MB';
        } else {
            storageUsageString = (storageUsage / (1000000000)).toFixed(3) + ' GB';
        }
    }

    let monthlyDuesDuration, yearlyDuesDuration;
    if (planOptions) {
        if (planOptions.monthly.firstDue === planOptions.monthly.lastDue) {
            monthlyDuesDuration = format(new Date(planOptions.monthly.firstDue), 'MM/dd/yyyy');
        } else {
            monthlyDuesDuration = `${format(new Date(planOptions.monthly.firstDue), 'MM/dd/yyyy')} ... ${format(new Date(planOptions.monthly.lastDue), 'MM/dd/yyyy')}`
        }
        if (planOptions.yearly.firstDue === planOptions.yearly.lastDue) {
            yearlyDuesDuration = `${format(new Date(planOptions.yearly.firstDue), 'MM/dd/yyyy')}`;
        } else {
            yearlyDuesDuration = `${format(new Date(planOptions.yearly.firstDue), 'MM/dd/yyyy')} ... ${format(new Date(planOptions.yearly.lastDue), 'MM/dd/yyyy')}`;
        }
    }

    debugLog(debugOn, "dues", dues)
    let dueItems = dues && (dues.length !== 0) && JSON.parse(JSON.stringify(dues)).reverse().map((item, i) =>
        <tr key={i}>
            <td>{format(new Date(item.dueTime), 'MM/dd/yyyy')}</td>
            <td>{item.monthlyInvoice.requiredStorage}</td>
            <td>${item.monthlyInvoice.monthlyPrice}</td>
        </tr>
    )

    const transactionItems = (transactions.length !== 0) && transactions.map((item, i) =>
        <tr key={i}>
            <td>{format(new Date(item.time), 'MM/dd/yyyy')}</td>
            <td>{`$${item.amount} ${item.currency}`}</td>
            <td>{item.requiredStorage}, {item.plan}</td>
            {item.plan === 'upgrade' ?
                <td></td> :
                <td>{item.firstDue === item.lastDue ? format(new Date(item.firstDue), 'MM/dd/yyyy') : `${format(new Date(item.firstDue), 'MM/dd/yyyy')} - ${format(new Date(item.lastDue), 'MM/dd/yyyy')}`}</td>
            }

        </tr>
    )

    const changePlan = (e) => {
        setPlan(e.target.value);
    }

    const handleCheckout = (e) => {
        dispatch(setCheckoutPlan(plan));
        router.push('/services/checkout');
    }

    const handleUpgrade = (e) => {
        dispatch(setCheckoutPlan('upgrade'));
        router.push('/services/checkout');
    }

    const fixTransactionWebCallFromAndroid = (data) => {
        debugLog(debugOn, 'transactionWebCall');
        if (data.status === 'ok') {
            let purchase = JSON.parse(data.purchase);
            debugLog(debugOn, 'purchase: ', purchase);
            savePendingAndroidPurchase(purchase);
        } else if (data.status === 'canceled') {
            router.push('/services/payment')
        } else if (data.status == 'error') {
            router.push('/services/payment')
        }
        dispatch(activityDone(accountActivity.AndroidInAppPurchase))
    }

    useEffect(() => {
        if (isLoggedIn) {
            if (process.env.NEXT_PUBLIC_platform === 'android') {
                if (window.Android) {
                    debugLog(debugOn, "Check pending purchase ...")
                    const pendingPurchase = window.Android.checkPendingPurchase();
                    debugLog(debugOn, pendingPurchase)
                    if (pendingPurchase !== 'null') {
                        return;
                    }
                }
            }
            dispatch(setCheckoutPlan(null));
            dispatch(getInvoiceThunk());
            dispatch(getTransactionsThunk());
        }
    }, [isLoggedIn])

    return (
        <ContentPageLayout>
            <Container className='px-4'>
                <br />
                <br />
                {dues && <div>
                    <Row>
                        <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }} style={{ border: 'solid', paddingTop: '12px', backgroundColor: '#FEF9E7' }}>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> Your current storage usage is <span className='fw-bold'>{storageUsageString}</span>. </p>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> You need the <span className='fw-bold'>{requiredStorage}</span> storage, <span className='fw-bold'>${monthlyPrice} USD</span> per month.</p>
                            {(dues.length === 0) &&
                                <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> Next due date is <span className='fw-bold'>{format(new Date(dueTime), 'MM/dd/yyyy')}</span></p>
                            }
                        </Col>
                    </Row>
                    {(dues.length !== 0) &&
                        <Row>
                            <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }} style={{ border: 'solid', paddingTop: '12px', backgroundColor: '#EBF5FB' }}>
                                <hr />
                                <h1>Invoice</h1>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Storage(GB)</th>
                                            <th>Due(USD)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dueItems}
                                    </tbody>
                                </Table>
                                <hr />
                                <h1>Total : {`$${planOptions.monthly.totalDues} USD`}</h1>
                            </Col>
                        </Row>
                    }
                    {(dues.length !== 0) && <>
                        <Row>
                            <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
                                <Form>
                                    <Form.Group controlId='plan'>
                                        <hr />
                                        <FormCheck>
                                            <FormCheck.Input type='radio' value='yearly' onChange={changePlan} checked={plan === 'yearly'} />
                                            <FormCheck.Label><h5 className='px-3' style={{ backgroundColor: '#48C9B0' }}>Pay yearly, get 2 months free.</h5></FormCheck.Label>
                                        </FormCheck>
                                        <br />
                                        <h4 className='px-4'>{planOptions && `$${planOptions.yearly.totalDues} USD.`}</h4>
                                        <br />
                                        <p>{planOptions && `For ${yearlyDuesDuration}.`}</p>
                                        <p>{planOptions && `Next due date:  ${format(new Date(planOptions.yearly.nextDueTime), 'MM/dd/yyyy')}`}</p>
                                        <hr />
                                        <FormCheck>
                                            <FormCheck.Input type='radio' value='monthly' onChange={changePlan} checked={plan === 'monthly'} />
                                            <FormCheck.Label><h5 className='px-3' style={{ backgroundColor: '#F7DC6F' }}>Pay monthly.</h5></FormCheck.Label>
                                        </FormCheck>
                                        <br />
                                        <h4 className='px-4'>{planOptions && `$${planOptions.monthly.totalDues} USD.`}</h4>
                                        <br />
                                        <p>{planOptions && `For ${monthlyDuesDuration}.`}</p>
                                        <p>{planOptions && `Next due date:  ${format(new Date(planOptions.monthly.nextDueTime), 'MM/dd/yyyy')}`}</p>
                                        <hr />
                                    </Form.Group>
                                </Form>
                                <div className='text-center'>
                                    < Button onClick={handleCheckout}>Checkout</Button>
                                </div>
                            </Col>
                        </Row>
                    </>}
                </div>}
                {upgradePrice && <>
                    <Row>
                        <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }} style={{ border: 'solid', paddingTop: '12px', backgroundColor: '#FEF9E7' }}>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> Your current storage usage is <span className='fw-bold'>{storageUsageString}</span>. </p>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> You need the {requiredStorage} storage, <span className='fw-bold'>${monthlyPrice}</span> USD per month.</p>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> Next due date is <span className='fw-bold'>{format(new Date(dueTime), 'MM/dd/yyyy')}</span></p>
                            <p className='fw-light'><i className="fa fa-dot-circle-o" aria-hidden="true"></i> Upgrade price for the remaining <span className='fw-bold'>{remainingDays}</span> days until the next due date - </p>
                            <h5 className='p-3'>{`$${upgradePrice} ${currency.toUpperCase()}`}</h5>
                            {waived ?
                                <h5>🙂 The fee is waived because it is less than one dollar.</h5>
                                :
                                <Row>
                                    <Col sm={{ span: 8, offset: 2 }} className='text-center'>
                                        <Button onClick={handleUpgrade}>Upgrade</Button>
                                    </Col>
                                </Row>
                            }

                        </Col>
                    </Row>

                </>}
                <br />
                {process.env.NEXT_PUBLIC_platform !== 'iOS' && process.env.NEXT_PUBLIC_platform !== 'android' &&
                    <Row>
                        <Col xs={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }} style={{ border: 'solid', paddingTop: '12px', backgroundColor: '#EAEDED', overflow: 'auto' }}>
                            <h1>Transaction History</h1>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Plan</th>
                                        <th>Paid Dues</th>
                                    </tr>
                                </thead>
                                {(transactions.length !== 0) &&
                                    <tbody>
                                        {
                                            transactionItems
                                        }
                                    </tbody>
                                }
                            </Table>
                            {(transactions.length === 0) &&
                                <p>Empty</p>
                            }
                        </Col>
                    </Row>
                }
                <br />
            </Container>
        </ContentPageLayout >
    )
}
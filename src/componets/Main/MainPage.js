import React from 'react';
import './MainPage.css';
import Header from "../Header/Header.js";
function MainPage(id) {
    return (
        <div className="Back">
            <Header/>
            <div className="block">
            <div className="BTitle">
            <p> Somalia: A tale of two countries</p>
            </div>
            <div className="Details">
                <div className="Apic"> <img src="https://picsum.photos/200"/></div>
                <div className="Author">Jatin Saini</div>
                <div className="date"> 11/09/1990</div>
                <div className="type"> Tech</div>
            </div>
            <div className="decs"> For the House and from a Plan</div>
            </div><img src="" alt="" />
            <div className="main">
            <img src="https://picsum.photos/600/200"/>
            <div className="data">
            Having endured cyclical crises spanning three decades, Somalia is both a fragile state and a resilient society. For decades, people have been organizing themselves and helping address crises on their own. At the local level, hybrid forms of governance, such as customary, religious, civic, private sector, and governmental authorities, have emerged to provide communities with variable, sometimes illiberal, but nonetheless real systems of governance. In the face of nascent state-led services, the private sector has filled the void to provide services.

In our latest Somalia Urbanization Review, Fostering Cities as Anchors of Development, we show that innovation has been the defining feature of the Somali private sector, which has flourished despite the difficulties, and has been the driving force behind the extraordinary pace of economic growth and revival. The future of Somalia’s cities, which hold the key to helping the country develop faster and further, will depend on the vibrancy and responsiveness of the private sector, putting a premium on developing policies, urban planning, and regulatory capacities that enable and catalyze accountable private sector behavior.

            </div>
            </div>
        </div>
    )
}

export default MainPage

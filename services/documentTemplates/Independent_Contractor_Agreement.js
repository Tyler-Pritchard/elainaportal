const keys = require('../../config/keys');

module.exports = Independent_Contractor_Agreement => {
    return `
    <html>
        <body>
            <p><span id="a542498" class="anchor"></span>Services Agreement</p>
            <p>This Services Agreement (this &quot;<strong>Agreement</strong>&quot;), dated as of {d.todaysdate} (the &quot;<strong>Effective Date</strong>&quot;), is by and between {d.serviceprovider}, a {d.stateofprovider} {d.entityprovider}, with offices located at {d.addressprovider} (&quot;<strong>Service Provider</strong>&quot;) and {d.customer}, a {d.stateofcustomer} {d.entitycustomer}, with offices located at {d.addresscustomer} (&quot;<strong>Customer</strong>&quot; and together with Service Provider, the &quot;<strong>Parties</strong>&quot;, and each a &quot;<strong>Party</strong>&quot;).</p>
            <p>WHEREAS Service Provider has the capability and capacity to provide certain {d.categoryofservices} services; and</p>
            <p>WHEREAS Customer desires to retain Service Provider to provide the said services, and Service Provider is willing to perform such services under the terms and conditions hereinafter set forth;</p>
            <p>NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, Service Provider and Customer agree as follows:</p>
            <ol type="1">
            <li><p><span id="a671585" class="anchor"></span><span class="underline">Services</span>. Service Provider shall provide to Customer the services (the &quot;<strong>Services</strong>&quot;) set out in one or more statements of work to be issued by Customer and accepted by Service Provider (each, a &quot;<strong>Statement of Work</strong>&quot;). The initial accepted Statement of Work is attached hereto as Exhibit A. Additional Statements of Work shall be deemed issued and accepted only if signed by the Service Provider Contract Manager and the Customer Contract Manager, appointed pursuant to Section 2.1(a) and Section 3.1, respectively.</p></li>
            <li><p><span id="a798307" class="anchor"></span><span class="underline">Service Provider Obligations</span>. Service Provider shall:</p>
            <ol type="1">
            <li><p><span id="a132991" class="anchor"></span>Designate employees {d.orcontractors} that it determines, in its sole discretion, to be capable of filling the following positions:</p>
            <ol type="a">
            <li><p><span id="a112448" class="anchor"></span>A primary contact to act as its authorized representative with respect to all matters pertaining to this Agreement (the &quot;<strong>Service Provider Contract Manager</strong>&quot;).</p></li>
            <li><p><span id="a970813" class="anchor"></span>A number of employees {d.orcontractors} that it deems sufficient to perform the Services set out in each Statement of Work, (collectively, with the Service Provider Contract Manager, &quot;<strong>Provider Representatives</strong>&quot;).</p></li>
            </ol></li>
            <li><p><span id="a428340" class="anchor"></span>Make no changes in Provider Representatives except:</p>
            <ol start="3" type="a">
            <li><p><span id="a753038" class="anchor"></span>Following notice to Customer.</p></li>
            <li><p><span id="a385806" class="anchor"></span>Upon the resignation, termination, death or disability of an existing Provider Representative.</p>
            <p><span id="a115996" class="anchor"></span>{d.replacementprovider}</p></li>
            </ol></li>
            <li><p><span id="a1003843" class="anchor"></span>{d.recordkeeping}</p></li>
            </ol></li>
            <li><p><span id="a297422" class="anchor"></span><span class="underline">Customer Obligations</span>. Customer shall:</p>
            <ol start="4" type="1">
            <li><p><span id="a445507" class="anchor"></span>Designate one of its employees or agents to serve as its primary contact with respect to this Agreement and to act as its authorized representative with respect to matters pertaining to this Agreement (the &quot;<strong>Customer Contract Manager</strong>&quot;), with such designation to remain in force unless and until a successor Customer Contract Manager is appointed.</p></li>
            <li><p><span id="a797990" class="anchor"></span>Require that the Customer Contract Manager respond promptly to any reasonable requests from Service Provider for instructions, information, or approvals required by Service Provider to provide the Services.</p></li>
            <li><p><span id="a653225" class="anchor"></span>Cooperate with Service Provider in its performance of the Services and provide access to Customer's premises, employees, contractors, and equipment as required to enable Service Provider to provide the Services.</p></li>
            <li><p><span id="a258781" class="anchor"></span>Take all steps necessary, including obtaining any required licenses or consents, to prevent Customer-caused delays in Service Provider's provision of the Services.</p></li>
            </ol></li>
            <li><p><span id="a599090" class="anchor"></span><span class="underline">Fees and Expenses</span>.</p>
            <ol start="8" type="1">
            <li><p><span id="a71660" class="anchor"></span>In consideration of the provision of the Services by the Service Provider and the rights granted to Customer under this Agreement, Customer shall pay the fees set out in {d.feesamount}. Payment to Service Provider of such fees and the reimbursement of expenses pursuant to this Section 4 shall constitute payment in full for the performance of the Services. Unless otherwise provided in the applicable Statement of Work, said fee will be payable within {d.paymentschedule} days of receipt by the Customer of an invoice from Service Provider but in no event more than {d.paymentschedule} days after completion of the Services performed pursuant to the applicable Statement of Work.</p></li>
            <li><p><span id="a185110" class="anchor"></span>Customer shall reimburse Service Provider for all reasonable expenses incurred in accordance with the Statement of Work {d.preapprovalexpenses}, within {d.preapprovalexpenses} days of receipt by the Customer of an invoice from Service Provider accompanied by receipts and reasonable supporting documentation.</p></li>
            <li><p><span id="a734104" class="anchor"></span>Customer shall be responsible for all sales, use and excise taxes, and any other similar taxes, duties and charges of any kind imposed by any federal, state or local governmental entity on any amounts payable by Customer hereunder; provided, that, in no event shall Customer pay or be responsible for any taxes imposed on, or regarding, Service Provider's income, revenues, gross receipts, personnel, or real or personal property or other assets.</p></li>
            <li><p><span id="a935758" class="anchor"></span>Except for invoiced payments that the Customer has successfully disputed, all late payments shall bear interest at the lesser of the rate of {d.interest}% per month or the highest rate permissible under applicable law, calculated daily and compounded monthly. {d.latereimburse} {d.suspensionofservices}</p></li>
            </ol></li>
            <li><p><span id="a67112" class="anchor"></span><span class="underline">Limited Warranty and Limitation of Liability</span>.</p>
            <ol start="12" type="1">
            <li><p><span id="a496956" class="anchor"></span>Service Provider warrants that it shall perform the Services:</p>
            <ol start="5" type="a">
            <li><p><span id="a422674" class="anchor"></span>In accordance with the terms and subject to the conditions set out in the respective Statement of Work and this Agreement.</p></li>
            <li><p><span id="a416038" class="anchor"></span>Using personnel of required skill, experience, and qualifications.</p></li>
            <li><p><span id="a170367" class="anchor"></span>In a timely, workmanlike, and professional manner in accordance with generally recognized industry standards for similar services.</p></li>
            </ol></li>
            <li><p><span id="a500854" class="anchor"></span>Service Provider's sole and exclusive liability and Customer's sole and exclusive remedy for breach of this warranty shall be as follows:</p>
            <ol start="8" type="a">
            <li><p><span id="a945610" class="anchor"></span>Service Provider shall use reasonable commercial efforts to promptly cure any such breach; provided, that if Service Provider cannot cure such breach within a reasonable time (but no more than 30 days) after Customer's written notice of such breach, Customer may, at its option, terminate the Agreement by serving written notice of termination in accordance with Section 8.2.</p></li>
            <li><p><span id="a844296" class="anchor"></span>In the event the Agreement is terminated pursuant to Section 5.2(a) above, Service Provider shall within 30 days after the effective date of termination, refund to Customer any fees paid by the Customer as of the date of termination for the Service or Deliverables (as defined in Section 6 below), less a deduction equal to the fees for receipt or use of such Deliverables or Service up to and including the date of termination on a pro-rated basis.</p></li>
            <li><p><span id="a289185" class="anchor"></span>The foregoing remedy shall not be available unless Customer provides written notice of such breach within 30 days after delivery of such Service or Deliverable to Customer.</p></li>
            </ol></li>
            <li><p><span id="a473002" class="anchor"></span>SERVICE PROVIDER MAKES NO WARRANTIES EXCEPT FOR THAT PROVIDED IN SECTION 5.1, ABOVE. ALL OTHER WARRANTIES, EXPRESS AND IMPLIED, ARE EXPRESSLY DISCLAIMED.</p></li>
            </ol></li>
            <li><p><span id="a661724" class="anchor"></span><span class="underline">Intellectual Property</span>. All intellectual property rights, including copyrights, patents, patent disclosures and inventions (whether patentable or not), trademarks, service marks, trade secrets, know-how and other confidential information, trade dress, trade names, logos, corporate names and domain names, together with all of the goodwill associated therewith, derivative works and all other rights (collectively, &quot;<strong>Intellectual Property Rights</strong>&quot;) in and to all documents, work product and other materials that are delivered to Customer under this Agreement or prepared by or on behalf of the Service Provider in the course of performing the Services, including any items identified as such in the Statement of Work (collectively, the &quot;<strong>Deliverables</strong>&quot;) shall be owned by Service Provider. Service Provider hereby grants Customer a license to use all Intellectual Property Rights in the Deliverables free of additional charge and on a non-exclusive, worldwide, non-transferable, non-sublicensable, fully paid-up, royalty-free and perpetual basis to the extent necessary to enable Customer to make reasonable use of the Deliverables and the Services.</p></li>
            <li><p><span id="a791037" class="anchor"></span><span class="underline">Confidentiality</span>. From time to time during the Term of this Agreement, either Party (as the &quot;<strong>Disclosing Party</strong>&quot;) may disclose or make available to the other Party (as the &quot;<strong>Receiving Party</strong>&quot;), non-public, proprietary, and confidential information of Disclosing Party that, if disclosed in writing or other tangible form is clearly labeled as &quot;confidential,&quot; or if disclosed orally, is identified as confidential when disclosed and within 5 days thereafter, is summarized in writing and confirmed as confidential (&quot;<strong>Confidential Information</strong>&quot;); provided, however, that Confidential Information does not include any information that: (a) is or becomes generally available to the public other than as a result of Receiving Party's breach of this Section 7; (b) is or becomes available to the Receiving Party on a non-confidential basis from a third-party source, provided that such third party is not and was not prohibited from disclosing such Confidential Information; (c) was in Receiving Party's possession prior to Disclosing Party's disclosure hereunder; or (d) was or is independently developed by Receiving Party without using any Confidential Information. The Receiving Party shall: (x) protect and safeguard the confidentiality of the Disclosing Party's Confidential Information with at least the same degree of care as the Receiving Party would protect its own Confidential Information, but in no event with less than a commercially reasonable degree of care; (y) not use the Disclosing Party's Confidential Information, or permit it to be accessed or used, for any purpose other than to exercise its rights or perform its obligations under this Agreement; and (z) not disclose any such Confidential Information to any person or entity, except to the Receiving Party's Group who need to know the Confidential Information to assist the Receiving Party, or act on its behalf, to exercise its rights or perform its obligations under this Agreement.</p></li>
            </ol>
            <p><span id="a264377" class="anchor"></span> If the Receiving Party is required by applicable law or legal process to disclose any Confidential Information, it shall, prior to making such disclosure, use commercially reasonable efforts to notify Disclosing Party of such requirements to afford Disclosing Party the opportunity to seek, at Disclosing Party's sole cost and expense, a protective order or other remedy. For purposes of this Section 7 only, Receiving Party's Group shall mean the Receiving Party's affiliates and its or their employees, officers, directors, shareholders, partners, members, managers, agents, independent contractors, service providers, sublicensees, subcontractors, attorneys, accountants, and financial advisors.</p>
            <ol start="8" type="1">
            <li><p><span id="a470597" class="anchor"></span><span class="underline">Term, Termination, and Survival</span>.</p>
            <ol start="15" type="1">
            <li><p><span id="a925980" class="anchor"></span>This Agreement shall commence as of the Effective Date and shall continue thereafter {d.term} unless sooner terminated pursuant to Section 8.2 or Section 8.3.</p></li>
            <li><p><span id="a716399" class="anchor"></span>Either Party may terminate this Agreement, effective upon written notice to the other Party (the &quot;<strong>Defaulting Party</strong>&quot;) if the Defaulting Party:</p>
            <ol start="11" type="a">
            <li><p><span id="a565406" class="anchor"></span>Materially breaches this Agreement, and such breach is incapable of cure, or with respect to a material breach capable of cure, the Defaulting Party does not cure such breach within {d.breach} days after receipt of written notice of such breach.</p></li>
            <li><p><span id="a815122" class="anchor"></span>Becomes insolvent or admits its inability to pay its debts generally as they become due.</p></li>
            <li><p><span id="a800395" class="anchor"></span>Becomes subject, voluntarily or involuntarily, to any proceeding under any domestic or foreign bankruptcy or insolvency law, which is not fully stayed within seven business days or is not dismissed or vacated within 45 business days after filing.</p></li>
            <li><p><span id="a110155" class="anchor"></span>Is dissolved or liquidated or takes any corporate action for such purpose.</p></li>
            <li><p><span id="a180879" class="anchor"></span>Makes a general assignment for the benefit of creditors.</p></li>
            <li><p><span id="a234285" class="anchor"></span>Has a receiver, trustee, custodian, or similar agent appointed by order of any court of competent jurisdiction to take charge of or sell any material portion of its property or business.</p></li>
            </ol></li>
            <li><p><span id="a910798" class="anchor"></span>Notwithstanding anything to the contrary in Section 8.2(a), Service Provider may terminate this Agreement before the expiration date of the Term on written notice if Customer fails to pay any amount when due hereunder: (a) and such failure continues for {d.failure} days after Customer's receipt of written notice of nonpayment; or (b) more than [NUMBER] times in any three month period;</p></li>
            <li><p><span id="a786806" class="anchor"></span>The rights and obligations of the parties set forth in this Section 8.4 and in Sections 5.3, 6, 7, 9,10, 12, 19, 20, 21, 22, and any right or obligation of the parties in this Agreement which, by its nature, should survive termination or expiration of this Agreement, will survive any such termination or expiration of this Agreement.</p></li>
            </ol></li>
            <li><p><span id="a986843" class="anchor"></span><span class="underline">Limitation of Liability</span>.</p>
            <ol start="19" type="1">
            <li><p><span id="a488327" class="anchor"></span>IN NO EVENT SHALL SERVICE PROVIDER BE LIABLE TO CUSTOMER OR TO ANY THIRD PARTY FOR ANY LOSS OF USE, REVENUE, OR PROFIT [OR LOSS OF DATA OR DIMINUTION IN VALUE], OR FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES WHETHER ARISING OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, REGARDLESS OF WHETHER SUCH DAMAGE WAS FORESEEABLE AND WHETHER OR NOT SERVICE PROVIDER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND NOTWITHSTANDING THE FAILURE OF ANY AGREED OR OTHER REMEDY OF ITS ESSENTIAL PURPOSE.</p></li>
            <li><p><span id="a733363" class="anchor"></span>IN NO EVENT SHALL SERVICE PROVIDER'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER ARISING OUT OF OR RELATED TO BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, EXCEED [[TWO (2)/[OTHER NUMBER]] TIMES] THE AGGREGATE AMOUNTS PAID OR PAYABLE TO SERVICE PROVIDER [PURSUANT TO THIS AGREEMENT/PURSUANT TO THE APPLICABLE STATEMENT OF WORK/IN THE [NUMBER] [YEAR/MONTH] PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM].</p>
            <p><span id="a339459" class="anchor"></span>{d.insurance}</p></li>
            </ol></li>
            <li><p><span class="underline"> </span> <span id="a363412" class="anchor"></span><span class="underline">Entire Agreement</span>. This Agreement, including and together with any related Statements of Work, exhibits, schedules, attachments and appendices, constitutes the sole and entire agreement of the Parties with respect to the subject matter contained herein, and supersedes all prior and contemporaneous understandings, agreements, representations and warranties, both written and oral, regarding such subject matter. The parties acknowledge and agree that if there is any conflict between the terms and conditions of this Agreement and the terms and conditions of any Statement of Work, the terms and conditions of this Agreement shall supersede and control.</p></li>
            <li><p><span id="a762666" class="anchor"></span><span class="underline">Notices</span>. All notices, requests, consents, claims, demands, waivers and other communications under this Agreement (each, a &quot;<strong>Notice</strong>&quot;, and with the correlative meaning &quot;<strong>Notify</strong>&quot;) must be in writing and addressed to the other Party at its address set forth below (or to such other address that the receiving Party may designate from time to time in accordance with this Section). Unless otherwise agreed herein, all Notices must be delivered by personal delivery, nationally recognized overnight courier or certified or registered mail (in each case, return receipt requested, postage prepaid). Except as otherwise provided in this Agreement, a Notice is effective only (a) on receipt by the receiving Party; and (b) if the Party giving the Notice has complied with the requirements of this Section 12.</p></li>
            </ol>
            <table>
            <thead>
            <tr class="header">
            <th>Notice to Customer:</th>
            <th>{d.customeraddress}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="odd">
            <td></td>
            <td>Attention: {d.customerofficer}</td>
            </tr>
            <tr class="even">
            <td>Notice to Service Provider:</td>
            <td>{d.serviceaddress}</td>
            </tr>
            <tr class="odd">
            <td></td>
            <td>Attention: {d.serviceofficer}</td>
            </tr>
            </tbody>
            </table>
            <ol start="12" type="1">
            <li><p><span id="a530268" class="anchor"></span><span class="underline">Severability</span>. If any term or provision of this Agreement is found by a court of competent jurisdiction to be invalid, illegal or unenforceable in any jurisdiction, such invalidity, illegality or unenforceability shall not affect any other term or provision of this Agreement or invalidate or render unenforceable such term or provision in any other jurisdiction; provided, however, that if any fundamental term or provision of this Agreement, is invalid, illegal or unenforceable, the remainder of this Agreement shall be unenforceable. Upon a determination that any term or provision is invalid, illegal or unenforceable, {d.modifications} modify this Agreement to effect the original intent of the Parties as closely as possible in order that the transactions contemplated hereby be consummated as originally contemplated to the greatest extent possible].</p></li>
            <li><p><span id="a647763" class="anchor"></span><span class="underline">Amendments</span>. No amendment to or modification of or rescission, termination or discharge of this Agreement is effective unless it is in writing, identified as an amendment to or rescission, termination or discharge of this Agreement and signed by an authorized representative of each Party.</p></li>
            <li><p><span id="a475408" class="anchor"></span><span class="underline">Waiver</span>. No waiver by any Party of any of the provisions of this Agreement shall be effective unless explicitly set forth in writing and signed by the Party so waiving. Except as otherwise set forth in this Agreement, no failure to exercise, or delay in exercising, any right, remedy, power or privilege arising from this Agreement shall operate or be construed as a waiver thereof, nor shall any single or partial exercise of any right, remedy, power or privilege hereunder preclude any other or further exercise thereof or the exercise of any other right, remedy, power or privilege.</p></li>
            <li><p><span id="a627537" class="anchor"></span><span class="underline">Assignment</span>. Customer shall not assign, transfer, delegate or subcontract any of its rights or delegate any of its obligations under this Agreement without the prior written consent of Service Provider. Any purported assignment or delegation in violation of this Section 16 shall be null and void. No assignment or delegation shall relieve the Customer of any of its obligations under this Agreement. {d.assignment}</p></li>
            <li><p><span id="a566040" class="anchor"></span><span class="underline">Successors and Assigns</span>. This Agreement is binding on and inures to the benefit of the Parties to this Agreement and their respective permitted successors and permitted assigns.</p></li>
            <li><p><span id="a1062566" class="anchor"></span><span class="underline">Relationship of the Parties</span>. The relationship between the parties is that of independent contractors. The details of the method and manner for performance of the Services by Service Provider shall be under its own control, Customer being interested only in the results thereof. The Service Provider shall be solely responsible for supervising, controlling and directing the details and manner of the completion of the Services. Nothing in this Agreement shall give the Customer the right to instruct, supervise, control, or direct the details and manner of the completion of the Services. The Services must meet the Customer's final approval and shall be subject to the Customer's general right of inspection throughout the performance of the Services and to secure satisfactory final completion. Nothing contained in this Agreement shall be construed as creating any agency, partnership, joint venture or other form of joint enterprise, employment or fiduciary relationship between the parties, and neither party shall have authority to contract for or bind the other party in any manner whatsoever.</p></li>
            <li><p><span id="a288326" class="anchor"></span><span class="underline">No Third-Party Beneficiaries</span>. This Agreement benefits solely the Parties to this Agreement and their respective permitted successors and assigns and nothing in this Agreement, express or implied, confers on any other Person any legal or equitable right, benefit or remedy of any nature whatsoever under or by reason of this Agreement.</p></li>
            </ol>
            <p><span id="a390261" class="anchor"></span></p>
            <ol start="19" type="1">
            <li><p><span id="a833073" class="anchor"></span><span class="underline">Choice of Law</span>. This Agreement and all related documents including all exhibits attached hereto, and all matters arising out of or relating to this Agreement, whether sounding in contract, tort, or statute are governed by, and construed in accordance with, the laws of the State of Illinois, United States of America, without giving effect to the conflict of laws provisions thereof to the extent such principles or rules would require or permit the application of the laws of any jurisdiction other than those of the State of Illinois.</p></li>
            <li><p><span id="a1062563" class="anchor"></span><span class="underline">Choice of Forum</span>. Each Party irrevocably and unconditionally agrees that it will not commence any action, litigation or proceeding of any kind whatsoever against the other Party in any way arising from or relating to this Agreement, including all exhibits, schedules, attachments and appendices attached to this Agreement, and all contemplated transactions, including contract, equity, tort, fraud and statutory claims, in any forum other than {d.district} or the courts of the State of Illinois sitting in {d.politicalsubdivision}, and any appellate court from any thereof. Each Party irrevocably and unconditionally submits to the exclusive jurisdiction of such courts and agrees to bring any such action, litigation or proceeding only in {d.district}or the courts of the State of Illinois sitting in {d.politicalsubdivision}. Each Party agrees that a final judgment in any such action, litigation, or proceeding is conclusive and may be enforced in other jurisdictions by suit on the judgment or in any other manner provided by law.</p></li>
            <li><p><span id="a958341" class="anchor"></span><span class="underline">Waiver of Jury Trial</span>. Each Party acknowledges that any controversy that may arise under this Agreement, including exhibits, schedules, attachments, and appendices attached to this Agreement, is likely to involve complicated and difficult issues and, therefore, each such Party irrevocably and unconditionally waives any right it may have to a trial by jury in respect of any legal action arising out of or relating to this Agreement, including any exhibits, schedules, attachments or appendices attached to this Agreement, or the transactions contemplated hereby.</p></li>
            <li><p><span id="a349506" class="anchor"></span><span class="underline">Counterparts</span>. This Agreement may be executed in counterparts, each of which is deemed an original, but all of which together are deemed to be one and the same agreement. Notwithstanding anything to the contrary in Section 12, a signed copy of this Agreement delivered by facsimile, email, or other means of electronic transmission is deemed to have the same legal effect as delivery of an original signed copy of this Agreement.</p></li>
            <li><p><span id="a381550" class="anchor"></span><span class="underline">Force Majeure</span>. The Service Provider shall not be liable or responsible to Customer, nor be deemed to have defaulted or breached this Agreement, for any failure or delay in fulfilling or performing any term of this Agreement when and to the extent such failure or delay is caused by or results from acts or circumstances beyond the reasonable control of Service Provider including, without limitation, acts of God, flood, fire, earthquake, explosion, governmental actions, war, invasion or hostilities (whether war is declared or not), terrorist threats or acts, riot, or other civil unrest, national emergency, revolution, insurrection, epidemic, lock-outs, strikes or other labor disputes (whether or not relating to either party's workforce), or restraints or delays affecting carriers or inability or delay in obtaining supplies of adequate or suitable materials, materials or telecommunication breakdown or power outage, provided that, if the event in question continues for a continuous period in excess of 30 days, Customer shall be entitled to give notice in writing to Service Provider to terminate this Agreement.</p></li>
            </ol>
            <p>[signature page follows]</p>
            <p><span id="a516362" class="anchor"></span>IN WITNESS WHEREOF, the parties hereto have caused this Agreement to be executed as of the Effective Date by their respective duly authorized officers.</p>
            <table>
            <thead>
            <tr class="header">
            <th></th>
            <th>{d.customer}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="odd">
            <td></td>
            <td><p>By_____________________</p>
            <p>Name:</p>
            <p>Title:</p></td>
            </tr>
            <tr class="even">
            <td></td>
            <td>{d.serviceprovider}</td>
            </tr>
            <tr class="odd">
            <td></td>
            <td><p>By_____________________</p>
            <p>Name:</p>
            <p>Title:</p></td>
            </tr>
            </tbody>
            </table>
            <p>EXHIBITS</p>
            <p>Exhibit A</p>
            <p>Initial Statement of Work</p>
            <p>{d.statementofwork}</p>

        </body>
    </html>
    `;
};
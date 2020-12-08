const keys = require('../../config/keys');

module.exports = Family_Medical_Leave_Policy => {
    return `
        <html>
            <body>
                <p>FAMILY AND MEDICAL LEAVE POLICY (IL)</p>
                <p><span id="a698668" class="anchor"></span>{d.employeName} provides leave according to the Family and Medical Leave Act (FMLA), which provides for unpaid, job-protected leave to covered employees in certain circumstances.</p>
                <p><span id="a897568" class="anchor"></span><strong><span class="underline">Eligibility</span></strong></p>
                <p><span id="a1036428" class="anchor"></span>To qualify for FMLA leave, you must: (1) have worked for {d.employeName} for at least 12 months, although it need not be consecutive; (2) worked at least 1,250 hours in the last 12 months; and (3) be employed at a worksite that has 50 or more employees within 75 miles. If you have any questions about your eligibility for FMLA leave, please contact the {d.thehumanResourcesDepartmentName}.</p>
                <p><span id="a314140" class="anchor"></span><strong><span class="underline">Leave Policy</span></strong></p>
                <p><span id="a1036429" class="anchor"></span>If eligible, you may take up to 12 or 26 weeks of family or medical leave, [(which is calculated as up to 72 or 156 days for eligible airline flight crew employees),] whichever is applicable (as explained below), within the relevant 12-month period defined below. While you are on FMLA leave, {d.employeName} will maintain your group health insurance coverage at the same level and under the same circumstances as when you were actively working, as explained more fully under the section titled, <em>Medical and Other Benefits</em>. Upon returning from approved FMLA leave, you have the right to be restored to the same job or an equivalent position, subject to the terms, limitations, and exceptions provided by law.</p>
                <p><span id="a1004381" class="anchor"></span><strong><span class="underline">Leave Entitlement</span></strong></p>
                <p><span id="a1036430" class="anchor"></span>You may take <strong>up to 12 weeks</strong> [(which is calculated as up to 72 days if you are an eligible airline flight crew employee)] of unpaid FMLA leave in a 12-month period, which [is defined as a calendar year/is defined as a fiscal year/is measured from an employee's anniversary date of hire/is measured forward from the date an employee's first FMLA leave begins/uses a &quot;rolling&quot; method that is measured backward from the date you use any FMLA leave] for any of the following reasons:</p>
                <ul>
                <li><p>The birth of a son or daughter and in order to care for that son or daughter (leave to be completed within one year of the child's birth).</p></li>
                <li><p>The placement of a son or daughter with you for adoption or foster care and in order to care for the newly placed son or daughter (leave to be completed within one year of the child's placement).</p></li>
                <li><p>To care for a spouse, son, daughter, or parent with a serious health condition.</p></li>
                <li><p>To care for your own serious health condition, which renders you unable to perform any of the essential functions of your position.</p></li>
                <li><p>A qualifying exigency of a spouse, son, daughter, or parent who is a military member on covered active duty or called to covered active duty status (or has been notified of an impending call or order to covered active duty).</p></li>
                </ul>
                <p><span id="a246007" class="anchor"></span>You may take <strong>up to 26 weeks</strong> [(which is calculated as up to 156 days if you are an eligible airline flight crew employee)] of unpaid FMLA leave in a single 12-month period, beginning on the first day that you take FMLA leave to care for a spouse, son, daughter, or next of kin who is a covered service member and who has a serious injury or illness related to active duty service, as defined by the FMLA's regulations (known as military caregiver leave).</p>
                <p><span id="a228690" class="anchor"></span><strong><span class="underline">Both Spouses Employed by</span></strong> {d.employeName} <span class="underline"> </span></p>
                <p><span id="a1036431" class="anchor"></span>Spouses who are both employed by {d.employeName} and eligible for FMLA leave may be limited to:</p>
                <ul>
                <li><p>A combined total of 12 weeks of leave during the 12-month period if leave is requested:</p>
                <ul>
                <li><p>for the birth of a son or daughter and in order to care for that son or daughter;</p></li>
                <li><p>for the placement of a son or daughter with the employee for adoption or foster care and in order to care for the newly placed son or daughter; or</p></li>
                <li><p>to care for an employee's parent with a serious health condition.</p></li>
                </ul></li>
                <li><p>A combined total of 26 weeks in a single 12-month period if the leave is either for:</p>
                <ul>
                <li><p>military caregiver leave; or</p></li>
                <li><p>a combination of military caregiver leave and leave for other FMLA-qualifying reasons.</p></li>
                </ul></li>
                </ul>
                <p><span id="a577128" class="anchor"></span><strong><span class="underline">Notice of Leave</span></strong></p>
                <p><span id="a1036432" class="anchor"></span>If your need for FMLA leave is foreseeable, you must give {d.employeName} at least 30 days' prior written notice. If this is not possible, you must at least give notice as soon as practicable (within one to two business days of learning of your need for leave). Failure to provide this notice may be grounds for delaying FMLA-protected leave, depending on the particular facts and circumstances.</p>
                <p><span id="a527767" class="anchor"></span>Additionally, if you are planning a medical treatment or a series of treatments or you are taking military caregiver leave, you must consult with {d.employeName} first regarding the dates of this treatment to work out a schedule that best suits the needs of the employee or the covered military member, if applicable, and {d.employeName} .</p>
                <p><span id="a410272" class="anchor"></span>Where the need for leave is not foreseeable, you are expected to notify {d.employeName} within one to two business days of learning of your need for leave, except in extraordinary circumstances{d.employeName} has Family and Medical Leave Act request forms available from the {d.humanResourcesDepartmentName}. Please submit a written request, using this form, when requesting leave.</p>
                <p><span id="a1036425" class="anchor"></span><strong><span class="underline">Certification of Need for Leave</span></strong></p>
                <p><span id="a1036433" class="anchor"></span>If you are requesting leave because of your own or a covered relative's serious health condition, you and the relevant health care provider must supply appropriate medical certification. You may obtain Medical Certification forms from the {d.humanResourcesDepartmentName}. . When you request leave, {d.employeName} will notify you of the requirement for medical certification and when it is due (at least 15 days after you request leave). If you provide at least 30 days' notice of medical leave, you should also provide the medical certification before leave begins. Failure to provide requested medical certification in a timely manner may result in denial of FMLA-covered leave until it is provided.</p>
                <p><span id="a1036434" class="anchor"></span>{d.employeName} , at its expense, may require an examination by a second health care provider designated by {d.employeName} . If the second health care provider's opinion conflicts with the original medical certification, {d.employeName} at its expense, may require a third, mutually agreeable, health care provider to conduct an examination and provide a final and binding opinion. {d.employeName} may require subsequent medical recertification. Failure to provide requested certification within 15 days, when practicable, may result in delay of further leave until it is provided.</p>
                <p><span id="a1036435" class="anchor"></span>{d.employeName} also reserves the right to require certification from a covered military member's health care provider if you are requesting military caregiver leave and certification in connection with military exigency leave.</p>
                <p><span id="a267370" class="anchor"></span><strong><span class="underline">Reporting While on Leave</span></strong></p>
                <p><span id="a1036436" class="anchor"></span>If you take leave because of your own serious health condition or to care for a covered relative, you must contact {d.employeName} on {d.requiredFrequency} regarding the status of the condition and your intention to return to work. In addition, you must give notice as soon as practicable (within two business days if feasible) if the dates of leave change or are extended or initially were unknown.</p>
                <p><span id="a922976" class="anchor"></span><strong><span class="underline">Leave Is Unpaid</span></strong></p>
                <p><span id="a1036437" class="anchor"></span>FMLA leave is unpaid. You {d.mayWillBeRequired} substitute any accrued and unused vacation/paid time off/sick days/personal days for unpaid FMLA leave as described below:</p>
                <ul>
                <li><p>If you request leave because of a birth, adoption, or foster care placement of a child, any accrued and unused paid leave [will/may] first be substituted for unpaid family/medical leave and run concurrently with your FMLA leave.</p></li>
                <li><p>If you request leave because of your own serious health condition, or to care for a covered relative with a serious health condition, any accrued paid vacation/personal /family or medical/sick leave [will/may] be substituted for any unpaid family/medical leave and run concurrently with your FMLA leave.</p></li>
                </ul>
                <p><span id="a1036438" class="anchor"></span>The substitution of paid leave time for unpaid FMLA leave time does not extend the 12 or 26 weeks (whichever is applicable) of the FMLA leave period. In no case can the substitution of paid leave time for unpaid leave time result in your receipt of more than 100% of your salary. Your FMLA leave runs concurrently with other types of leave, for example, accrued vacation time that is substituted for unpaid FMLA leave and any state family leave laws, to the extent allowed by state law.</p>
                <p><span id="a972337" class="anchor"></span><strong><span class="underline">Medical and Other Benefits</span></strong></p>
                <p><span id="a1036439" class="anchor"></span>During approved FMLA leave, {d.employeName} will maintain your health benefits as if you continued to be actively employed. If paid leave is substituted for unpaid FMLA leave, {d.employeName} will deduct your portion of the health plan premium as a regular payroll deduction. If your leave is unpaid, you must pay your portion of the premium through {d.paymentMethod}. Your health care coverage will cease if your premium payment is more than 30 days late. If your payment is more than 15 days late, we will send you a letter to this effect. If we do not receive your premium payment within 15 days after the date of this letter, your coverage may cease. If you elect not to return to work for at least 30 calendar days at the end of the leave period, you will be required to reimburse {d.employeName} for the cost of the health benefit premiums paid by {d.employeName} for maintaining coverage during your unpaid leave, unless you cannot return to work because of a serious health condition or other circumstances beyond your control.</p>
                <p><span id="a822799" class="anchor"></span><strong><span class="underline">Intermittent and Reduced Leave Schedule</span></strong></p>
                <p><span id="a1036441" class="anchor"></span>If medically necessary, FMLA leave occasioned by a serious health condition may be taken intermittently (in separate blocks of time due to a serious health condition) or on a reduced leave schedule (reducing the usual number of hours you work per workweek or workday). FMLA leave may also be taken intermittently or on a reduced leave schedule for a qualifying exigency relating to covered military service.</p>
                <p><span id="a1036442" class="anchor"></span>If leave is unpaid, {d.employeName} will reduce your salary based on the amount of time actually worked. In addition, while you are on an intermittent or reduced schedule leave, {d.employeName} may temporarily transfer you to an available alternative position that better accommodates your leave schedule and has equivalent pay and benefits.</p>
                <p><span id="a463679" class="anchor"></span><strong><span class="underline">Returning from Leave</span></strong></p>
                <p><span id="a1036443" class="anchor"></span>If you take leave because of your own serious health condition (except if you are taking intermittent leave), you are required, as are all employees returning from other types of medical leave, to provide medical certification that you are fit to resume work. Otherwise, you will not be permitted to resume work until it is provided.</p>
                <p><span id="a123456" class="anchor"></span><strong>[<span class="underline">State or Local Family and Medical Leave Laws</span></strong></p>
                <p><span id="a1036444" class="anchor"></span>State or local law may vary from federal law. See below for a summary of the applicable laws, including eligibility requirements, for locations where {d.employeName} operates.</p>
                <p><span id="a1036445" class="anchor"></span></p>
                <p>Illinois Human Rights Act</p>
                <p>Employee Sick Leave Act</p>
                <p>Family Military Leave Act</p>
                <p><span id="a602536" class="anchor"></span><strong>[<span class="underline">Employees Covered Under a Collective Bargaining Agreement</span></strong></p>
                <p><span id="a1036448" class="anchor"></span>The employment terms set out in this policy work in conjunction with, and do not replace, amend, or supplement any terms or conditions of employment stated in any collective bargaining agreement that a union has with {d.employeName} . Employees should consult the terms of their collective bargaining agreement.]</p>
                <p><span id="a1036449" class="anchor"></span><strong>[<span class="underline">Acknowledgment of Receipt and Review</span></strong></p>
                <p><span id="a927390" class="anchor"></span>[I, _______________________ (employee name), acknowledge that on _____________________ (date), I received a copy of {d.employeName} 's Family and Medical Leave Policy and that I read it, understood it, and agree to comply with it. I understand that {d.employeName} has the maximum discretion permitted by law to interpret, administer, change, modify, or delete this policy at any time[ with or without notice]. No statement or representation by a supervisor or manager or any other employee, whether oral or written, can supplement or modify this policy. Changes to this policy can only be made if approved in writing by the {d.position} of {d.employeName} . I also understand that any delay or failure by {d.employeName} to enforce any work policy or rule will not constitute a waiver of {d.employeName}'s right to do so in the future. I understand that neither this policy nor any other communication by a management representative or any other employee, whether oral or written, is intended in any way to create a contract of employment. I understand that, unless I have a written employment agreement signed by an authorized {d.employeName} representative, <strong><span class="underline">I am employed at will and this policy does not modify my at-will employment status.</span></strong> If I have a written employment agreement signed by an authorized {d.employeName} representative and this policy conflicts with the terms of my employment agreement, I understand that the terms of my employment agreement will control.</p>
                <p><span id="a927391" class="anchor"></span><strong>OR</strong></p>
                <p><span id="a927392" class="anchor"></span>I, ________________________ (employee name), acknowledge that on ______________________ (date), I received and read a copy of {d.employeName}'s Family and Medical Leave Policy, dated _________ (edition date) and understand that it is my responsibility to be familiar with and abide by its terms. [I understand that the information in this policy is intended to help {d.employeName}'s employees to work together effectively on assigned job responsibilities.] This policy is not promissory and does not set terms or conditions of employment or create an employment contract.]</p>
                <p>[signature page follows]</p>
                <table>
                <tbody>
                <tr class="odd">
                <td></td>
                <td><p>________________________</p>
                <p>Signature</p>
                <p>________________________</p>
                <p>Printed Name</p>
                <p>________________________</p>
                <p>Date</p></td>
                </tr>
                </tbody>
                </table>

            </body>
        </html>
    `;
};
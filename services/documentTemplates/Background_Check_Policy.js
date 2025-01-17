const keys = require('../../config/keys');

module.exports = Background_Check_Policy => {
    return `
        <html lang="en">
            <body class="chat-body">
                <div class="dashboard-main-wrapper">
                    <p>BACKGROUND CHECK POLICY (IL)</p>
                    <p><span id="a185072" class="anchor"></span><strong><span class="underline">Background Checks</span></strong></p>
                    <p><span id="a1027854" class="anchor"></span>{d.employeeName} {d.requireMayRequire} applicants and employees to satisfactorily complete a background check. {d.employeeName} will consider your job duties, among other factors, in determining what constitutes satisfactory completion of the background check. All information obtained as a result of a background check will be used solely for employment purposes.</p>
                    <p><span id="a944993" class="anchor"></span><strong><span class="underline">Authorization</span></strong></p>
                    <p><span id="a1027855" class="anchor"></span>When a background check is required, you must complete {d.employeeName}'s authorization form. Failure to timely complete an authorization may result in termination of {d.employeeName}'s consideration of your application. Falsification or omission of information may result in denial of employment or discipline, up to and including termination.</p>
                    <p><span id="a182257" class="anchor"></span><strong><span class="underline">Confidentiality</span></strong></p>
                    <p><span id="a1027856" class="anchor"></span>All background check information will be kept confidential. {d.employeeName} complies with all applicable federal and Illinois state and local laws regarding background checks.</p>
                    <p><span id="a745293" class="anchor"></span><strong><span class="underline">Administration of this Policy</span></strong></p>
                    <p><span id="a525031" class="anchor"></span>The {d.humanResourcesDepartmentName} Department is responsible for the administration of this policy. If you have any questions regarding this policy or if you have any questions about background checks that are not addressed in this policy, please contact the {d.humanResourcesDepartmentName} Department.</p>
                    <p><span id="a115147" class="anchor"></span><strong><span class="underline">[Employees Covered Under a Collective Bargaining Agreement</span></strong></p>
                    <p><span id="a1027857" class="anchor"></span>The employment terms set out in this policy work in conjunction with, and do not replace, amend, or supplement any terms or conditions of employment stated in any collective bargaining agreement that a union has with {d.employeeName} . Employees should consult the terms of their collective bargaining agreement.</p>
                    <p><span id="a882736" class="anchor"></span><strong><span class="underline">[Acknowledgment of Receipt and Review</span></strong></p>
                    <p><span id="a1027858" class="anchor"></span>[I, _______________________ (employee name), acknowledge that on _____________________ (date), I received a copy of {d.employeeName} 's Background Check Policy and that I read it, understood it, and agree to comply with it. I understand that {d.employeeName} has the maximum discretion permitted by law to interpret, administer, change, modify, or delete this policy at any time with or without notice. No statement or representation by a supervisor or manager or any other employee, whether oral or written, can supplement or modify this policy. Changes can only be made if approved in writing by the {d.position} of {d.employeeName}. I also understand that any delay or failure by {d.employeeName} to enforce any work policy or rule will not constitute a waiver of {d.employeeName}'s right to do so in the future. I understand that neither this policy nor any other communication by a management representative or any other employee, whether oral or written, is intended in any way to create a contract of employment. I understand that, unless I have a written employment agreement signed by an authorized {d.employeeName} representative, <strong><span class="underline">I am employed at will and this policy does not modify my at-will employment status</span></strong>. If I have a written employment agreement signed by an authorized [EMPLOYER NAME] representative and this policy conflicts with the terms of my employment agreement, I understand that the terms of my employment agreement will control.</p>
                    <p><span id="a1027859" class="anchor"></span><strong>OR</strong></p>
                    <p><span id="a1027860" class="anchor"></span>I, ________________________ (employee name), acknowledge that on ______________________ (date), I received and read a copy of the {d.employeeName} 's Background Check Policy[, dated _______________ (edition date) and understand that it is my responsibility to be familiar with and abide by its terms. I understand that the information in this Policy is intended to help {d.employeeName}'s employees work together effectively on assigned job responsibilities. This Policy is not promissory and does not set terms or conditions of employment or create an employment contract.]</p>
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
                </div>
            </body>
        </html>
    `;
};
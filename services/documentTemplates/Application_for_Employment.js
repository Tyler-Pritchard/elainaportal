const keys = require('../../config/keys');

module.exports = Application_for_Employment => {
    return `
        <html>
            <body>
                <table>
                <tbody>
                <tr class="odd">
                <td>[EMPLOYER] LOGO HERE</td>
                </tr>
                </tbody>
                </table>
                <p><strong>APPLICATION FOR EMPLOYMENT</strong></p>
                <p>Please provide complete and legible information. An incomplete application may affect your consideration for employment. If necessary, attach a separate sheet for additional information.</p>
                <p>{d.employeeName} is committed to a policy of Equal Employment Opportunity and will not discriminate against an applicant or employee on the basis of race, color, religion, creed, national origin or ancestry, sex, age, physical or mental disability, pregnancy, veteran or military status, unfavorable discharge from military service, genetic information, sexual orientation, marital status, order of protection status, citizenship status, arrest record or expunged or sealed convictions, other protected classes, or any other legally recognized protected basis under federal, Illinois, or local law. The information collected by this application is solely to determine suitability for employment, verify identity, and maintain employment statistics on applicants.</p>
                <p>Applicants with disabilities may be entitled to reasonable accommodation under the Americans with Disabilities Act, the Illinois Human Rights Act, and applicable local laws. A reasonable accommodation is a change in the way things are normally done which will ensure an equal employment opportunity without imposing undue hardship on {d.employeeName} . Please inform the company's personnel representative if you need assistance completing this application or to otherwise participate in the application process.</p>
                <p>[Your application will be active for [30/60/90] days. If you are not hired during that time, but wish to continue to be considered for available positions, you must complete a new application.]</p>
                <p>GENERAL INFORMATION</p>
                <table>
                <tbody>
                <tr class="odd">
                <td><p>Full Name <span class="underline"> </span> Date <span class="underline"> </span></p>
                <p>FIRST MIDDLE LAST</p>
                <p>Address <span class="underline"> </span></p>
                <p>STREET CITY STATE ZIP CODE</p>
                <p>Contact Number <span class="underline">( )</span> Date available for work <span class="underline"> </span></p>
                <p>Alternate Contact Number <span class="underline">( )</span> Email (optional) _______________________________________</p>
                <p>Are you legally authorized to work in the United States? Yes No</p>
                <p>Do you now, or will you in the future, require immigration sponsorship for work authorization (e.g., H-1B)? Yes No</p>
                <p>(If hired, verification will be required consistent with federal law.)</p>
                <p>Are you at least 18 years old? Yes No</p>
                <p>(If no, you may be required to provide authorization to work.)</p>
                <p>[Do you have a driver's license? Yes No Operator Commercial (CDL)</p>
                <p>Driver's license number ____________________ State of issue _______________ Expiration date: _________________]</p>
                <p>[How did you learn about [the position/{d.employeeName}]? <span class="underline"> ] </span></p></td>
                </tr>
                </tbody>
                </table>
                <p>POSITION INFORMATION</p>
                <table>
                <tbody>
                <tr class="odd">
                <td><p>[Position applied for: <span class="underline"> ]</span> [Salary range expected[ (required)] <span class="underline"> ]</span></p>
                <p>[Applying for: Full-time Part-time Seasonal/Temporary]</p></td>
                </tr>
                </tbody>
                </table>
                <p>EDUCATION</p>
                <table>
                <thead>
                <tr class="header">
                <th><p>Type of</p>
                <p>School</p></th>
                <th><p>School Name</p>
                <p>and Location</p></th>
                <th>Number of Years Completed</th>
                <th>Diploma, Degree, or Certificate Received</th>
                <th><p>Course of Study</p>
                <p>or Major</p></th>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                <td>High School (or G.E.D. equivalent)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr class="even">
                <td>College or University</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td><p>Graduate</p>
                <p>School</p></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr class="even">
                <td>Vocational or Trade School</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Other</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                </tbody>
                </table>
                <p>BACKGROUND INFORMATION</p>
                <p>During the past {d.number} years, have you ever been discharged, suspended, or asked to resign from any position?</p>
                <p>Yes No If yes, please explain. <span class="underline"> </span></p>
                <p>For the purpose of verifying information on this application, have you ever worked or attended school under a different name at any of the organizations you have listed? Yes No If yes, specify name. <span class="underline"> </span></p>
                <p>[PERSONAL/PROFESSIONAL] REFERENCES</p>
                <table>
                <thead>
                <tr class="header">
                <th>List three [personal/professional] references (other than those listed as a current/former supervisor) that we may contact:</th>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                <td>Name <span class="underline"> </span></td>
                <td>Telephone No. ( <span class="underline">)</span> <span class="underline"> </span></td>
                </tr>
                <tr class="even">
                <td>Email Address <span class="underline"> </span></td>
                <td>Type of Acquaintance <span class="underline"> </span></td>
                </tr>
                <tr class="odd">
                <td>Name <span class="underline"> </span></td>
                <td>Telephone No. ( <span class="underline">)</span> <span class="underline"> </span></td>
                </tr>
                <tr class="even">
                <td>Email Address <span class="underline"> </span></td>
                <td>Type of Acquaintance <span class="underline"> </span></td>
                </tr>
                <tr class="odd">
                <td>Name <span class="underline"> </span></td>
                <td>Telephone No. ( <span class="underline">)</span> <span class="underline"> </span></td>
                </tr>
                <tr class="even">
                <td>Email Address <span class="underline"> </span></td>
                <td>Type of Acquaintance <span class="underline"> </span></td>
                </tr>
                </tbody>
                </table>
                <p>EMPLOYMENT RECORD</p>
                <p>List all employment experience for the past [NUMBER] years, starting with the most recent or present employer, including U.S. military service or training. Using a separate section for each position, describe in detail all work experience. <strong>You may include as part of your employment history any verifiable work performed on a volunteer basis.</strong> <strong>Resumes may not be substituted in lieu of completing the following employment information.</strong></p>
                <table>
                <thead>
                <tr class="header">
                <th>Current Employer <span class="underline"> </span></th>
                <th>Phone (___) <span class="underline"> </span></th>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                <td>Geographic Location <span class="underline"> </span></td>
                <td><p>From <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td>Your Position <span class="underline"> </span></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Supervisor's Name/Title <span class="underline"> </span></td>
                <td><p>To <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td>May we contact? Yes No If not, why? <span class="underline"> </span></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Primary responsibilities <span class="underline"><br />
                </span></td>
                <td></td>
                </tr>
                <tr class="even">
                <td>Employer <span class="underline"> </span></td>
                <td>Phone (___) <span class="underline"> </span></td>
                </tr>
                <tr class="odd">
                <td>Geographic Location <span class="underline"> </span></td>
                <td><p>From <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td>Your Position <span class="underline"> </span></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Supervisor's Name/Title <span class="underline"> </span></td>
                <td><p>To <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Primary responsibilities <span class="underline"><br />
                </span></td>
                <td></td>
                </tr>
                <tr class="even">
                <td>Employer <span class="underline"> </span></td>
                <td>Phone (___) <span class="underline"> </span></td>
                </tr>
                <tr class="odd">
                <td>Geographic Location <span class="underline"> </span></td>
                <td><p>From <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td>Your Position <span class="underline"> </span></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Supervisor's Name/Title <span class="underline"> </span></td>
                <td><p>To <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Primary responsibilities <span class="underline"><br />
                </span></td>
                <td></td>
                </tr>
                <tr class="even">
                <td>Employer <span class="underline"> </span></td>
                <td>Phone (___) <span class="underline"> </span></td>
                </tr>
                <tr class="odd">
                <td>Geographic Location <span class="underline"> </span></td>
                <td><p>From <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td>Your Position <span class="underline"> </span></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Supervisor's Name/Title <span class="underline"> </span></td>
                <td><p>To <span class="underline"> </span></p>
                <p>Month Year</p></td>
                </tr>
                <tr class="even">
                <td></td>
                <td></td>
                </tr>
                <tr class="odd">
                <td>Primary responsibilities <span class="underline"><br />
                </span></td>
                <td></td>
                </tr>
                </tbody>
                </table>
                <p>Have you worked for {d.employeeName} before?</p>
                <p>Yes No If yes, at what location? ____________ Job title: __________________</p>
                <p>[Relatives of current employees of {d.employeeName} [will not be hired if they would be working for, or directly supervising, a current employee/cannot work together in the same department or on the same team as a current employee]. If you receive a conditional offer of employment, you may be asked to identify any relative who is a current employee of {d.employeeName}. For purposes of this policy, “relative” is defined as any person who is related by blood or marriage, or whose relationship with the employee is similar to that of people who are related by blood or marriage.]</p>
                <p>[Have you signed or otherwise agreed to any non-solicitation, non-competition, or other similar post-employment restriction or agreement with your current or any prior employer? Yes No If yes, explain: _______________________________________________________ ]</p>
                <p><strong>PLEASE READ CAREFULLY AND INITIAL EACH PARAGRAPH BEFORE SIGNING</strong></p>
                <table>
                <tbody>
                <tr class="odd">
                <td><p>I understand, where permissible under applicable federal, Illinois, and local law, I may be subject to a pre-employment drug test after receiving a conditional offer of employment, and must receive a negative result for illegal drug use before being permitted to commence work with {d.employeeName}.</p>
                <p>___________ Initials</p>
                <p>I understand, where permissible under applicable federal, Illinois, and local law, I may be subject to a pre-employment medical examination after receiving a conditional offer of employment, and must meet the qualifications for the position, with or without reasonable accommodation, before being permitted to commence work with {d.employeeName}.</p>
                <p>___________ Initials</p>
                <p>I understand, where permissible under applicable federal, Illinois, and local law, I may be subject to a pre-employment background check after receiving a conditional offer of employment to investigate my criminal background, driving record, and other matters related to my suitability for employment. I understand that a separate disclosure and consent form will be provided to me prior to any background check.</p>
                <p>___________ Initials</p>
                <p>I understand employment with {d.employeeName} is also contingent on my providing sufficient documentation necessary to establish my identity and eligibility to work in the United States.</p>
                <p>___________ Initials</p>
                <p>I authorize {d.employeeName} and its representatives to contact my current and former employers (with the exception of my current employer, if I have marked “May we contact?” on page [3/PAGE NUMBER] of this application as “No”), schools, references, and other persons or organizations I have named in this application for the purpose of verifying the information I have provided. I release my current and former employers, schools, references, and other persons or organizations named in this application from any liability resulting from the information released. I authorize employers, schools, and other persons or organizations named in this application to provide any information or transcripts requested.</p>
                <p>___________ Initials</p>
                <p>[I hereby certify that, if employed, my employment with {d.employeeName} will not conflict with, violate, breach, or result in default under, any contract, agreement, or understanding that I am a party to or am bound by, including any non-solicitation, non-competition, or other similar post-employment restriction or agreement I have with any current or former employer, other than the contracts, agreements, covenants, or understandings I have disclosed in this application, if any.</p>
                <p>___________ Initials]</p>
                <p><strong>I understand and agree that, if hired, my employment will be at will, which means employment is for an indefinite period of time and may be terminated by myself or</strong> {d.employeeName} <strong>at any time, with or without cause, and with or without notice. </strong></p>
                <p>___________ Initials]</p>
                <p>I certify that all of the above information is true and complete, and I understand that any falsification or omission of information made by me may disqualify me from further consideration for employment or, if hired, may result in my termination at any time during the period of my employment regardless of the amount of time that has passed.</p>
                <p>___________ Initials</p>
                <p>Note: An offer of employment is conditioned upon complying with {d.employeeName}'s requirements including, but not limited to, signing a separate disclosure and consent form prior to any background check.</p>
                <p>MY SIGNATURE IS EVIDENCE THAT I HAVE READ AND AGREE WITH THE ABOVE STATEMENTS.</p>
                <p>Applicant's signature <span class="underline"> </span> Date <span class="underline"> </span></p></td>
                </tr>
                </tbody>
                </table>
            </body>
        </html>
    `;
};
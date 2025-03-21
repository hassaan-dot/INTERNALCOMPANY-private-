const constants = {
    api_base_url: 'https://hcapi.abdullahkimrigh.sa',
    // api_base_url:"https://scholarspace.online",
    login_api: '\/api\/auth\/login',
    login_step_2_api: '/api/loginStep2',
    signup:'/api/signup',
    logout_api:'/api/logout',

    //Get Api
    getstudentsemester:"/api/studentsemesters",
    get_departments_api :"/api/departments",
    get_role:'/api/roles',
    get_userrole:'/api/userroles',
    get_employees:"/api/employees",
    get_room:"/api/rooms",
    get_students:"/api/students",
    get_users:"/api/users",
    get_domains:"/api/domains",
    get_domain_leader:"/api/domainleaders",
    get_programs:"/api/programs",
    get_semesters:"/api/semesters",
    get_plannedCourse:"/api/plannedcourses",
    get_courses:"/api/offeredcourses",
    get_courses_count:"/api/courseCount",
    get_pre :"/api/prereqs",
    get_clos:"/api/clos",
    get_timeslots:"/api/timeslots",
    get_coursetimetableschedules:"/api/coursetimetable", /// changes this
    clomappingplo:'/api/clomappingplos', 
    get_book:"/api/books",
    gerrole_count:'/api/roles',
    getemployee_domain:"/api/employeedomains",
    get_timetableforcourses:"/api/timetable",   
    getclasscomponent:"/api/classcomponents",
    //del Api
    delete_deparments:"/api/departments",
    delete_role:"/api/roles",
    delete_userrole:'/api/userroles',
    delete_employee:"/api/employees",
    delete_room :"/api/rooms",
    delete_student:"/api/students",
    delete_domains:"/api/domains",
    delete_plannedCourse:"/api/plannedcourses",
    delete_courses:"/api/courses",
    delete_program:"/api/programs",
    delete_pre:"/api/prereqs",
    delete_semester:"/api/semesters",
    delete_domain_leader:"/api/domainleaders",
    delete_timeslot:"/api/timeslots",
    delete_clo:"/api/clos",
    deleteclomappingplos :"/api/clomappingplos",
    delstudentsemester:"/api/studentsemesters",

    //update
    update_department:"/api/departments",
    update_role:"/api/roles",
    update_room :"/api/rooms",
    update_employee:"/api/employees",
    update_userRole:"/api/userroles",
    update_program:"/api/programs",
    update_pre:"/api/prereqs",
    update_semster:"/api/semesters",
    update_plannedCourse:"/api/plannedcourses",
    update_student :"/api/students",
    update_course:"/api/courses",
    update_domain:"/api/domains",
    update_domain_leader :"/api/domainleaders",
    update_employee_domain:"/api/employeedomains",
    update_timeslot:"/api/timeslots",
    update_clo:"/api/clos",
    updateclomappingplos:"/api/clomappingplos",
    updatestudentsemester:"/api/studentsemesters",

    //post add
    addstudentsemester:"/api/studentsemesters",

    add_department:"/api/departments",
    add_roles:"/api/roles",
    add_employee:"/api/employees",
    add_userRoles:"/api/userroles",
    add_domainLeader:"/api/domainleaders",
    add_time_slot:"/api/timeslots",
    add_rooms:"/api/rooms",
    add_programs:"/api/programs",
    add_planCourse:"/api/plannedcourses",
    add_pre:"/api/prereqs",
    add_semster:"/api/semesters",
    add_student:"/api/students",
    add_courses :"/api/courses",
    add_domain:"/api/domains",
    add_employeeDomain:"/api/employeedomains",
    add_timetable:"/api/coursetimetableschedules",
    filter:"/api/filter",
    addclo:"/api/clos",
   addclomappingplos:'/api/clomappingplos',

    // chats
    addchats:"/api/chats",
    getchatbyid:"/api/chat",

    // classroom
    // add
    announcent:"/api/announcements",
    componentassignment:"/api/classcomponents",
    
    //Enrollements
    addenrollements:"/api/enrollements",
    getenrollements:"/api/enrollements",
    deleteenrollements:"/api/enrollments",
    updateenrollements:"/api/enrollments",

    // subcomponent
     addsubcomponent:"/api/subcomponents",
     getsubcomponent:"/api/subcomponents",
     deletesubcomponent:"/api/subcomponents",

     updateclasscomponent:"/api/classcomponents",
    //  deleteclasscomponent:"/api/classcomponents",

     // student in course
     getstudentincourse:"/api/studentsbycourse",

     // coursetimetable
     getcoursetimetable:"/api/timetable",   // changed
     // lecture attendace
     addlectureattendace :'/api/lectureattendance',
     getlectureattendance:'/api/studentAttendance',
     // plo
      addplo:"/api/plos",
      getplo:"/api/plos",
      deleteplo:"/api/plos",
      updateplo:"/api/plos",

      // Attachments
      getattachments:"/api/attachments",
      addattachments:"/api/attachments",
      // Student Submission
      addsubdentsubmission:"/api/studentsubmission",


      // Permission
       addpermission:"/api/permissions",
       getpermission:"/api/permissions",
       deletepermission:"/api/permissions",
       updatepermission:"/api/permissions",


       // userole permiision group
       getuserrolepermissiongroup:"/api/userrolepermissongroups",

       // get users by roles
       getUsersByRoleId:'/api/getUsersByRoleId',

       // employee details
       getemployeedetails:'/api/getEmployeeDataRequest'

}


const login_api = constants.api_base_url+'\/api\/auth\/login';
const get_attendance=constants.api_base_url+constants.getlectureattendance
const logout_api =constants.api_base_url+constants.logout_api;
const login_step_2_api =   constants.api_base_url+constants.login_step_2_api;
const get_departments_api = constants.api_base_url+constants.get_departments_api;
const delete_deparments = constants.api_base_url+constants.delete_deparments;
const update_department=  constants.api_base_url+constants.update_department;
const add_department =constants.api_base_url+constants.add_department;
const add_roles =  constants.api_base_url+constants.add_roles;
const get_role = constants.api_base_url+constants.get_role;
const delete_role = constants.api_base_url+constants.delete_role;
const update_role =constants.api_base_url+constants.update_role;
const get_userrole = constants.api_base_url+constants.get_userrole;
const delete_userrole = constants.api_base_url+constants.delete_userrole;
const get_employees =constants.api_base_url+constants.get_employees;
const delete_employee =constants.api_base_url+constants.delete_employee;
const get_room = constants.api_base_url+constants.get_room;
const delete_room =constants.api_base_url+constants.delete_room;
const  update_room =  constants.api_base_url+constants.update_room;
const update_employee = constants.api_base_url+constants.update_employee;
const add_employee =constants.api_base_url+constants.add_employee;
const get_students =constants.api_base_url+constants.get_students;
const delete_student =constants.api_base_url+constants.delete_student;
const add_userRoles = constants.api_base_url+constants.add_userRoles;
const get_users =constants.api_base_url+constants.get_users;
const update_userRole =constants.api_base_url+constants.update_userRole;
const get_domains =constants.api_base_url+constants.get_domains;
const delete_domains =  constants.api_base_url+constants.delete_domains;
const get_domain_leader =constants.api_base_url+constants.get_domain_leader;
const add_domainLeader =constants.api_base_url+constants.add_domainLeader;
const add_time_slot = constants.api_base_url+constants.add_time_slot;
const get_programs = constants.api_base_url+constants.get_programs;
const add_rooms = constants.api_base_url+constants.add_rooms;
const get_semesters =constants.api_base_url+constants.get_semesters;
const get_plannedCourse =constants.api_base_url+ constants.get_plannedCourse;
const delete_plannedCourse =constants.api_base_url+constants.delete_plannedCourse;
const get_courses =constants.api_base_url+constants.get_courses;
const get_courses_count =constants.api_base_url+constants.get_courses_count;
const delete_courses =constants.api_base_url+constants.delete_courses;
const add_programs =constants.api_base_url+constants.add_programs;
const delete_program= constants.api_base_url+constants.delete_program;
const update_program =constants.api_base_url+constants.update_program;
const add_planCourse =constants.api_base_url+constants.add_planCourse;
const get_pre =constants.api_base_url+constants.get_pre;
const delete_pre =constants.api_base_url+constants.delete_pre;
const update_pre =constants.api_base_url+constants.update_pre;
const add_pre = constants.api_base_url+constants.add_pre;
const delete_semester= constants.api_base_url+constants.delete_semester;
const update_semster =constants.api_base_url+constants.update_semster;
const add_semster =constants.api_base_url+constants.add_semster;
const update_plannedCourse =constants.api_base_url+constants.update_plannedCourse;
const update_student =constants.api_base_url+constants.update_student;
const add_student =constants.api_base_url+constants.add_student;
const add_courses = constants.api_base_url+constants.add_courses;
const get_clos =constants.api_base_url+constants.get_clos;
const update_course=constants.api_base_url+constants.update_course;
const get_timeslots =constants.api_base_url+constants.get_timeslots;
const get_coursetimetableschedules =constants.api_base_url+constants.get_coursetimetableschedules;
const update_domain =  constants.api_base_url+constants.update_domain;
const add_domain = constants.api_base_url+constants.add_domain;
const delete_domain_leader =constants.api_base_url+constants.delete_domain_leader;
const update_domain_leader =constants.api_base_url+constants.update_domain_leader;
const get_book = constants.api_base_url+constants.get_book;
const update_employee_domain =constants.api_base_url+constants.update_employee_domain;
const signup =constants.api_base_url+constants.signup;
const gerrole_count  =constants.api_base_url+constants.gerrole_count;
const getemployee_domain =constants.api_base_url+constants.getemployee_domain;
const add_employeeDomain   =  constants.api_base_url+constants.add_employeeDomain;
const get_timetableforcourses =  constants.api_base_url+constants.get_timetableforcourses;
const add_timetable =constants.api_base_url+constants.add_timetable;
const filter =  constants.api_base_url+constants.filter;
// time slot
const delete_timeslot =constants.api_base_url+constants.delete_timeslot;
const update_timeslot  =constants.api_base_url+constants.update_timeslot;
// classroom 
const announcent =  constants.api_base_url+constants.announcent;
const addcomponentassignment = constants.api_base_url+constants.componentassignment;

// enrollemnets
const addenrollements =constants.api_base_url+constants.addenrollements;
const getenrollements =constants.api_base_url+constants.getenrollements;
const deleteenrollements =constants.api_base_url+constants.deleteenrollements;
const updateenrollements =constants.api_base_url+constants.updateenrollements;
// subcomponent
const addsubcomponent =constants.api_base_url+constants.addsubcomponent;
const getsubcomponent =constants.api_base_url+constants.getsubcomponent;
const deletesubcomponent =constants.api_base_url+constants.deletesubcomponent;
// class component
const getclasscomponent =  constants.api_base_url+constants.getclasscomponent;
const updateclasscomponent =constants.api_base_url+constants.updateclasscomponent;
const deleteclasscomponent=constants.api_base_url+constants.componentassignment
// chats
const addchats  = constants.api_base_url+constants.addchats;
const getchatbyid = constants.api_base_url+constants.getchatbyid;
// student in course
const getstudentincourse =constants.api_base_url+constants.getstudentincourse;
// course time table
const getcoursetimetable = constants.api_base_url+constants.getcoursetimetable;
// lecture attendace
const addlectureattendace =constants.api_base_url+constants.addlectureattendace;

// clo
const delete_clo =constants.api_base_url+constants.delete_clo;
const update_clo =constants.api_base_url+constants.update_clo;
const addclo =constants.api_base_url+constants.addclo;

// plo
const addplo =constants.api_base_url+constants.addplo;
const getplo =constants.api_base_url+constants.getplo;
const deleteplo =constants.api_base_url+constants.deleteplo;
const updateplo =constants.api_base_url+constants.updateplo;
// Attachment
const getattachments =constants.api_base_url+constants.getattachments;
const addattachments =constants.api_base_url+constants.addattachments;
// Student submission
const addsubdentsubmission =constants.api_base_url+constants.addsubdentsubmission;

// Permission
 const addpermission =constants.api_base_url+constants.addpermission;
const getpermission =constants.api_base_url+constants.getpermission;
const deletepermission =constants.api_base_url+constants.deletepermission;
const updatepermission =constants.api_base_url+constants.updatepermission;
 // user role permission group
 const getuserrolepermissiongroup = constants.api_base_url+constants.getuserrolepermissiongroup;
 
 //clomappingplo
 const get_clomappingplo =constants.api_base_url+constants.clomappingplo;
 const addclomappingplos =constants.api_base_url+constants.addclomappingplos;
 const deleteclomappingplos =constants.api_base_url+constants.deleteclomappingplos;
 const updateclomappingplos =constants.api_base_url+constants.updateclomappingplos;

 /// student semester
 const getstudentsemester =constants.api_base_url+constants.getstudentsemester;
 const addstudentsemester =constants.api_base_url+constants.addstudentsemester;
 const delstudentsemester =constants.api_base_url+constants.delstudentsemester;
 const updatestudentsemester =constants.api_base_url+constants.updatestudentsemester;

//  get user by roles
const getUsersByRoleId =constants.api_base_url+constants.getUsersByRoleId;

// employee
 const getemployeedetails =constants.api_base_url+constants.getemployeedetails;
module.exports = {
    //enrollemnts
    addenrollements,
    getenrollements,
    deleteenrollements,
    updateenrollements,
    get_attendance,
    login_api,
    login_step_2_api,
    signup,
    logout_api,
    //get
    get_departments_api,
    get_role,
    get_userrole,
    get_employees,
    get_room,
    get_students,
    get_users,
    get_domains,
    get_domain_leader,
    get_programs,
    get_semesters,
    get_plannedCourse,
    get_courses,
    get_courses_count,
    get_pre,
    get_clos,
    get_timeslots,
    get_coursetimetableschedules,
    get_book,
    gerrole_count,
    getemployee_domain,
    get_timetableforcourses,
    getclasscomponent,
    getsubcomponent,
    //del
    delstudentsemester,
    delete_deparments,
    delete_role,
    delete_userrole,
    delete_employee,
    delete_room,
    delete_student,
    delete_domains,
    delete_plannedCourse,
    delete_courses,
    delete_program,
    delete_pre,
    delete_semester,
    delete_domain_leader,
    delete_timeslot,
    deletesubcomponent,
    //update
    updatestudentsemester,
    update_department,
    update_role,
    update_room,
    update_employee,
    update_userRole,
    update_program,
    update_pre,
    update_semster,
    update_plannedCourse,
    update_student,
    update_course,
    update_domain,
    update_domain_leader,
    update_employee_domain,
    update_timeslot,
    
    //add
    addstudentsemester,
    add_department,
    add_roles,
    add_employee,
    add_userRoles,
    add_domainLeader,
    add_time_slot,
    add_rooms,
    add_programs,
    add_planCourse,
    add_pre,
    add_semster,
    add_student,
    add_courses,
    add_domain,
    add_employeeDomain,
    add_timetable,
    filter,


    // announcment 
    announcent,
    addcomponentassignment,

    //
    addsubcomponent,

    updateclasscomponent,
    deleteclasscomponent,
    // chats
    addchats,
    getchatbyid,
    // student in course
    getstudentincourse,
    //coursetime table
    getcoursetimetable,
    // lecture attendance
    addlectureattendace,

    //_clo
    delete_clo,
    update_clo,
    addclo,

    // plo
    addplo,
    getplo,
    deleteplo,
    updateplo,

    //Attachments
    getattachments,
    addattachments,

    //Student Submission
    addsubdentsubmission,

    // Permission
    addpermission,
    getpermission,
    deletepermission,
    updatepermission,
    // userole permission group
    getuserrolepermissiongroup,
    //clomappingplo
    get_clomappingplo,
    addclomappingplos,
    deleteclomappingplos,
    updateclomappingplos,

    //Student semester
    getstudentsemester,

    // user by roles
    getUsersByRoleId,

    // get employee data
    getemployeedetails,
}


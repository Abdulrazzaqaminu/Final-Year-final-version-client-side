import React from "react";
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as TbIcons from 'react-icons/tb';

const SidebarDate = [
    {
        title: "Dashboard",
        path:"/",
        icon: <MdIcons.MdSpaceDashboard /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Department",
        path:"/department",
        icon: <GrIcons.GrOrganization /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Employees",
        path:"/employees",
        icon: <BsIcons.BsFillPeopleFill /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Attendance",
        path: "#",
        icon: <SiIcons.SiSimpleanalytics /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "Record Attendance",
                path: "/attendance/record_attendance",
                icon: <BsIcons.BsRecordCircle />
            },
            {
                title: "Attendance Report",
                path: "/attendance/attendance_report",
                icon: <TbIcons.TbReportAnalytics />
            },
        ]
    },
    {
        title: "Enrollment",
        path: "/enrollment",
        icon: <AiIcons.AiFillFileText /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: "Payroll",
        path: "/payroll",
        icon: <FaIcons.FaMoneyCheck /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Loans",
        path: "/loans",
        icon: <FaIcons.FaMoneyBillWave /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Logout",
        path: "/Logout",
        icon: <FiIcons.FiLogOut /> ,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
]

export default SidebarDate;
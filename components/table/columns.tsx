// "use client"
// import { ColumnDef } from "@tanstack/react-table"
// import { MoreHorizontal } from "lucide-react"
//  import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import StatusBadge from "../StatusBadge"
// import { formatDateTime } from "@/lib/utils"
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [
//   {
//     header: "ID",
//     cell: ({ row }) => {
//        <p className="text-14-medium ">{row.index + 1}</p>;
//     },
  
//   {
//     accessorKey: "patient",
//     header: "Patient",
//     cell: ({ row }) => 
//        <p className="text-14-medium ">{row.original.patient.name}</p>
    
//   }

//   {

//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       return (
//         <div className="min-w-[115px]">
//           <StatusBadge status={row.original.status} />
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "schedule",
//     header: "Appointment",
//     cell: ({ row }) => {
     
//       return (
//         <p className="text-14-regular min-w-[100px]">
//           {formatDateTime(row.original.schedule).dateTime}
//         </p>
//       );
//     },
//   },
  
//     id: "actions",
//     cell: ({ row }) => {
//       const payment = row.original
 
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
  
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)
 
//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
// ]

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";


import { StatusBadge } from "../StatusBadge";
import { AppointmentModal } from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      const patientName = appointment.patient?.name || "Unknown Patient"; // Fallback for missing patient
      return <p className="text-14-medium">{patientName}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      const status = appointment.status || "Unknown Status"; // Fallback for missing status
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      const dateTime = formatDateTime(appointment.schedule)?.dateTime || "Unknown Schedule"; // Fallback for missing schedule
      return <p className="text-14-regular min-w-[100px]">{dateTime}</p>;
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || "/default-doctor.png"} // Fallback for missing image
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name || "Unknown Doctor"}</p> {/* Fallback for missing doctor */}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient?.$id || ""}
            userId={appointment.userId || ""}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patient?.$id || ""}
            userId={appointment.userId || ""}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];



       
    
           

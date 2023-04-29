// Alternate database structure: Tasks grouped within life categories


// {
//     "users": [
//         {
//           "id": "1",
//           "fullName": "John Doe",
//           "email": "john@example.com",
//           "password": "password123"
//         },
//         {
//           "id": "2",
//           "fullName": "Jane Doe",
//           "email": "jane@example.com",
//           "password": "password456"
//         },
//         {
//           "id": "3",
//           "fullName": "Bob Smith",
//           "email": "bobsmith@example.com"
//         }
//       ],  
//     "tasks": [
//         {
//           "id": 1,
//           "category": "3",
//           "to-dos": [
//             {
//               "id": 1,
//               "userId": 1,
//               "description": "Finish project proposal",
//               "urgency": "2",
//               "dueDate": "2023-05-15",
//               "estimatedTime": 60,
//               "selectedTime": "1:00-2:00pm",
//               "actualTime": 120,
//               "completed": true
              
//             },
//             {
//               "id": 2,
//               "userId": 1,
//               "description": "Schedule meeting with team",
//               "urgency": "2",
//               "dueDate": "2023-08-15",
//               "estimatedTime": 60,
//               "selectedTime": "2:00-3:00pm",
//               "actualTime": 90,
//               "completed": true
              
//             },
//             {
//                 "id": 3,
//                 "userId": 2,
//                 "description": "Finish last section of report for work project",
//                 "urgencyLevel": "1",
//                 "deadline": "2023-05-15",
//                 "estimatedTime": 10,
//                 "selectedTime": "7:00-7:10am",
//                 "actualTime":25,
//                 "completed": true
//             },
//             {
//                 "id": 3,
//                 "userId": 2,
//                 "description": "Answer last night emails",
//                 "urgencyLevel": "1",
//                 "deadline": "2023-05-15",
//                 "estimatedTime": 15,
//                 "selectedTime": "7:00-7:15pm",
//                 "actualTime":null,
//                 "completed": false
//             },
//             {
//               "id": 4,
//               "userId": 1,
//               "description": "Prepare for meeting with the boss",
//               "urgencyLevel": "2",
//               "dueDate": "2023-05-01",
//               "estimatedTime": 60,
//               "selectedTime": "9:00-10:00am",
//               "actualTime": 55,
//               "completed": false
//             },
//             {
//               "id": 5,
//               "userId": 2,
//               "description": "Finish quarterly report",
//               "urgencyLevel": 4,
//               "dueDate": "2023-05-15",
//               "estimatedTime": 180,
//               "selectedTime": "2:00-5:00pm",
//               "actualTime": 200,
//               "completed": false
//             }

//           ]
//         },
//         {
//           "id": 2,
//           "category": "2",
//           "to-dos": [
//             {
//                 "id": 1,
//                 "userId": 1,
//                 "description": "Buy groceries",
//                 "urgency": "1",
//                 "dueDate": "2023-04-30",
//                 "estimatedTime": 30,
//                 "selectedTime": "4:00-4:30pm",
//                 "actualTime": 45,
//                 "completed": true
//               },
//             {
//               "id": 2,
//               "userId": 2,
//               "description": "Take kids to soccer practice",
//               "urgency": "1",
//               "dueDate": "2023-05-09",
//               "estimatedTime": 90,
//               "selectedTime": "4:00-5:30pm",
//               "actualTime": 180,
//               "completed": true
//             },
//             {
//               "id": 3,
//               "userId": 1,
//               "title": "Plan family vacation",
//               "urgency": "3",
//               "dueDate": "2023-05-03",
//               "estimatedTime": 240,
//               "selectedTime": "8:00-12:00pm",
//               "actualTime": null,
//               "completed": false
//             },
//             {
//               "id": 4,
//               "userId":2,
//               "title": "Organize family photos",
//               "urgency": "4",
//               "dueDate": "2023-05-30",
//               "estimatedTime": 60,
//               "selectedTime": "9:00-10:00pm",
//               "actualTime": null,
//               "completed": false
//             },
//             {
//                 "id": 4,
//                 "userId": 1,
//                 "description": "Call mom for her birthday",
//                 "urgencyLevel": 3,
//                 "deadline": "2023-04-30",
//                 "estimatedTime": 15,
//                 "selectedTime": "8:00-8:15am",
//                 "actualTime": null,
//                 "completed":false
//               },
//               {
//                 "id": 5,
//                 "userId": 1,
//                 "description": "Attend parent-teacher conference",
//                 "urgencyLevel": 3,
//                 "dueDate": "2023-05-20",
//                 "estimatedTime": 120,
//                 "selectedTime": "2:00-4:00pm",
//                 "actualTime": null,
//                 "completed": false
//               }
//           ]
//         },
//         {
//           "id": 3,
//           "category": "1",
//           "to-dos": [
//             {
//                 "id": 1,
//                 "userId": 2,
//                 "description": "Go for a run in the park",
//                 "urgencyLevel": 2,
//                 "deadline":  "2023-04-30",
//                 "estimatedTime": 30,
//                 "selectedTime": "6:00-6:30am",
//                 "actualTime": null,
//                 "completed":false
//               },
//             {
//               "id": 2,
//               "userId": 1,
//               "description": "Meditate for 10 minutes",
//               "urgencyLevel": 2,
//               "deadline":  "2023-04-15",
//               "estimatedTime": 30,
//               "selectedTime": "7:00-7:10am",
//               "actualTime": null,
//               "completed":false
//             },
//             {
//               "id": 3,
//               "title": "Read a book",
//               "urgencyLevel": 2,
//                 "deadline":  "2023-04-30",
//                 "estimatedTime": 60,
//                 "selectedTime": "10:00-11:00pm",
//                 "actualTime": null,
//                 "completed":false
//             },
//             {
//               "id": 4,
//               "userId": 2,
//               "category": "Self-care",
//               "description": "Take a yoga class",
//               "urgencyLevel": 1,
//               "dueDate": "2023-04-25",
//               "estimatedTime": 90,
//               "selectedTime": "8:00-9:30am",
//               "actualTime": 80,
//               "completed": true
//             }
//           ]
//          }
        
//       ]
// }
import { useState } from "react";
import {Button,Form,Container,Row,Col,CloseButton, Modal} from "react-bootstrap";


export const TaskForm = ({ fetchAllTasks}) => {

 
  const [isFormValid, setIsFormValid] = useState(false);

  const [show, setShow] = useState(false);
  
  /*
          TODO: Add the correct default properties to the
          initial state object
      */

  const [task, update] = useState({
    userId: "",
    description: "",
    category: "",
    urgencyLevel: "",
    deadline: "",
    estimatedTime: "",
    actualTime: "",
    startTime: "",
    endTime: "",
    completed: false,
  });

  const localAppUser = localStorage.getItem("app_user");
  const appUserObject = JSON.parse(localAppUser);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   // define validation function
   const validateForm = () => {
    if (
      task.urgencyLevel &&
      task.category &&
      task.description &&
      task.deadline &&
      task.estimatedTime,
      task.startTime &&
      task.endTime 
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      alert("Please fill in all required fields.");
    }
  };

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    validateForm();
    if (isFormValid) {
    // TODO: Create the object to be saved to the API
    const taskToSendToAPI = {
      userId: appUserObject.id,
      description: task.description,
      category: task.category,
      urgencyLevel: task.urgencyLevel,
      deadline: task.deadline,
      estimatedTime: task.estimatedTime,
      actualTime: task.actualTime,
      startTime: task.startTime,
      endTime: task.endTime,
      completed: false,
    };

    // Perform fetch() to POST the object to the API
    fetch(`http://localhost:8088/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        /*update page with current list of tasks */
        fetchAllTasks();
      })
      .then(() => {
        /* update function resets form fields to default values so user can submit another task without having to manually clear the form */
        update({
          userId: 0,
          description: "",
          category: "",
          urgencyLevel: "",
          deadline: "",
          estimatedTime: "",
          actualTime: "",
          startTime: "",
          endTime: "",
          completed: false,
        });
      })
      .then(() => {
       handleClose ();
      });
    }
  };
  return (
    <>
    <div className="add-new-task-button d-grid mt-5">
              <Button className="new-task "
                variant="outline-warning"
                size="sm"
                onClick={handleShow}
              >
                + New Task
              </Button>
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group as={Row} controlId="urgency">
            <Form.Label column sm={2} >
              Urgency:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={task.urgencyLevel}
                required
                onChange={(evt) => {
                  const copy = { ...task };
                  copy.urgencyLevel = evt.target.value;
                  /*reset fields to default setting*/
                  update(copy);
                }}
              >
                <option value="">-- Select Urgency Level --</option>
                <option value="1">Level 1: Urgent & only you can do</option>
                <option value="2">Level 2: Urgent but can delegate</option>
                <option value="3">Level 3: Not Urgent but mandatory</option>
                <option value="4">Level 4: Not Urgent and optional</option>
              </Form.Control>
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="category">
            <Form.Label column sm={2} >
              Category:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={task.category}
                required
                onChange={(evt) => {
                  const copy = { ...task };
                  copy.category = evt.target.value;
                  update(copy);
                }}
              >
                <option value="">-- Select Category --</option>
                <option value="1">Self care</option>
                <option value="2">Family life</option>
                <option value="3">Work life</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label" >Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={task.description}
              required
              onChange={(evt) => {
                const copy = { ...task };
                copy.description = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label" >Deadline:</Form.Label>
            <Form.Control 
              type="date"
              placeholder="Enter Due Date"
              value={task.deadline}
              required
              onChange={(evt) => {
                const copy = { ...task };
                copy.deadline = evt.target.value;
                update(copy);
              }}
              
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label" >Estimated Time(min):</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Length of time needed (min) "
              value={task.estimatedTime}
              required
              onChange={(evt) => {
                const copy = { ...task };
                copy.estimatedTime = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">
              Completion Time(min):
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Length of time used (min) "
              value={task.actualTime}
              onChange={(evt) => {
                const copy = { ...task };
                copy.actualTime = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="task-form-group">
  <Form.Label className="task-form-label">Start Time:</Form.Label>
  <Form.Control
    type="time"
    value={task.startTime}
    onChange={(evt) => {
      const copy = { ...task };
      copy.startTime = evt.target.value;
      update(copy);
    }}
  />
</Form.Group>
<Form.Group className="task-form-group">
  <Form.Label className="task-form-label">End Time:</Form.Label>
  <Form.Control
    type="time"
    value={task.endTime}
    onChange={(evt) => {
      const copy = { ...task };
      copy.endTime = evt.target.value;
      update(copy);
    }}
  />
</Form.Group>

  
          <Button
            type="submit"
            variant="success"
            bsPrefix="submit-task-button"
            onClick={(clickEvent) => {
              handleSubmitButtonClick(clickEvent);
            }}
          >
            Submit Task
          </Button>
          </Form>
          </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
  
 
};


//last version w/out modal= inlign form

// import { useState } from "react";
// import {Button,Form,Container,Row,Col,CloseButton} from "react-bootstrap";
// import { EditForm } from "./EditForm";

// export const TaskForm = ({ fetchAllTasks}) => {

//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
//   /*
//           TODO: Add the correct default properties to the
//           initial state object
//       */

//   const [task, update] = useState({
//     userId: "",
//     description: "",
//     category: "",
//     urgencyLevel: "",
//     deadline: "",
//     estimatedTime: "",
//     actualTime: "",
//     startTime: "",
//     endTime: "",
//     completed: false,
//   });

//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
  
//   const toggleAddTaskForm = () => {
//     setIsFormVisible(!isFormVisible);
   
//   };



//   const localAppUser = localStorage.getItem("app_user");
//   const appUserObject = JSON.parse(localAppUser);


//    // define validation function
//    const validateForm = () => {
//     if (
//       task.urgencyLevel &&
//       task.category &&
//       task.description &&
//       task.deadline &&
//       task.estimatedTime,
//       task.startTime &&
//       task.endTime 
//     ) {
//       setIsFormValid(true);
//     } else {
//       setIsFormValid(false);
//       alert("Please fill in all required fields.");
//     }
//   };

//   const handleSubmitButtonClick = (event) => {
//     event.preventDefault();
//     validateForm();
//     if (isFormValid) {
//     // TODO: Create the object to be saved to the API
//     const taskToSendToAPI = {
//       userId: appUserObject.id,
//       description: task.description,
//       category: task.category,
//       urgencyLevel: task.urgencyLevel,
//       deadline: task.deadline,
//       estimatedTime: task.estimatedTime,
//       actualTime: task.actualTime,
//       startTime: task.startTime,
//       endTime: task.endTime,
//       completed: false,
//     };

//     // Perform fetch() to POST the object to the API
//     fetch(`http://localhost:8088/tasks`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(taskToSendToAPI),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         /*update page with current list of tasks */
//         fetchAllTasks();
//       })
//       .then(() => {
//         /* update function resets form fields to default values so user can submit another task without having to manually clear the form */
//         update({
//           userId: 0,
//           description: "",
//           category: "",
//           urgencyLevel: "",
//           deadline: "",
//           estimatedTime: "",
//           actualTime: "",
//           startTime: "",
//           endTime: "",
//           completed: false,
//         });
//       })
//       .then(() => {
//         toggleAddTaskForm();
//       });
//     }
//   };
//   return (
//     <>
//    {/* passing to EditForm so form can use the state variable and the function to allow edit button to display/hide form when clicked  */}
//   {isEditFormVisible && (<EditForm 
//         />
//       )}
//       <Container>
//         <Form>
//         <div className="add-new-task-button d-grid mt-5">
//               <Button className="new-task "
//                 // bsPrefix="newtask-button"
//                 variant="outline-warning"
//                 size="sm"
//                 onClick= {toggleAddTaskForm}
//               >
//                 + New Task
//               </Button>
//         </div>
//         {isFormVisible ? <>
//           <div className="add-task-close-button">
//             <CloseButton
//               type="button"
//               onClick={toggleAddTaskForm}
//             ></CloseButton>
//           </div>
//           <Form.Group as={Row} controlId="urgency">
//             <Form.Label column sm={2} >
//               Urgency:
//             </Form.Label>
//             <Col sm={10}>
//               <Form.Control
//                 as="select"
//                 value={task.urgencyLevel}
//                 required
//                 onChange={(evt) => {
//                   const copy = { ...task };
//                   copy.urgencyLevel = evt.target.value;
//                   /*reset fields to default setting*/
//                   update(copy);
//                 }}
//               >
//                 <option value="">-- Select Urgency --</option>
//                 <option value="1">Urgent and Important</option>
//                 <option value="2">Urgent but not important</option>
//                 <option value="3">Not Urgent but important</option>
//                 <option value="4">Not Urgent and Not important</option>
//               </Form.Control>
//             </Col>
//           </Form.Group>
  
//           <Form.Group as={Row} controlId="category">
//             <Form.Label column sm={2} >
//               Category:
//             </Form.Label>
//             <Col sm={10}>
//               <Form.Control
//                 as="select"
//                 value={task.category}
//                 required
//                 onChange={(evt) => {
//                   const copy = { ...task };
//                   copy.category = evt.target.value;
//                   update(copy);
//                 }}
//               >
//                 <option value="">-- Select Category --</option>
//                 <option value="1">Self care</option>
//                 <option value="2">Family life</option>
//                 <option value="3">Work life</option>
//               </Form.Control>
//             </Col>
//           </Form.Group>
//           <Form.Group className="task-form-group">
//             <Form.Label className="task-form-label" >Description:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter task description"
//               value={task.description}
//               required
//               onChange={(evt) => {
//                 const copy = { ...task };
//                 copy.description = evt.target.value;
//                 update(copy);
//               }}
//             />
//           </Form.Group>
//           <Form.Group className="task-form-group">
//             <Form.Label className="task-form-label" >Deadline:</Form.Label>
//             <Form.Control 
//               type="date"
//               placeholder="Enter Due Date"
//               value={task.deadline}
//               required
//               onChange={(evt) => {
//                 const copy = { ...task };
//                 copy.deadline = evt.target.value;
//                 update(copy);
//               }}
              
//             />
//           </Form.Group>
//           <Form.Group className="task-form-group">
//             <Form.Label className="task-form-label" >Estimated Time:</Form.Label>
//             <Form.Control 
//               type="text"
//               placeholder="Length of time needed (min) "
//               value={task.estimatedTime}
//               required
//               onChange={(evt) => {
//                 const copy = { ...task };
//                 copy.estimatedTime = evt.target.value;
//                 update(copy);
//               }}
//             />
//           </Form.Group>
//           <Form.Group className="task-form-group">
//             <Form.Label className="task-form-label">
//               Completion Time:
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Length of time used (min) "
//               value={task.actualTime}
//               onChange={(evt) => {
//                 const copy = { ...task };
//                 copy.actualTime = evt.target.value;
//                 update(copy);
//               }}
//             />
//           </Form.Group>
//           <Form.Group className="task-form-group">
//   <Form.Label className="task-form-label">Start Time:</Form.Label>
//   <Form.Control
//     type="time"
//     value={task.startTime}
//     onChange={(evt) => {
//       const copy = { ...task };
//       copy.startTime = evt.target.value;
//       update(copy);
//     }}
//   />
// </Form.Group>
// <Form.Group className="task-form-group">
//   <Form.Label className="task-form-label">End Time:</Form.Label>
//   <Form.Control
//     type="time"
//     value={task.endTime}
//     onChange={(evt) => {
//       const copy = { ...task };
//       copy.endTime = evt.target.value;
//       update(copy);
//     }}
//   />
// </Form.Group>

  
//           <Button
//             type="submit"
//             variant="success"
//             bsPrefix="submit-task-button"
//             onClick={(clickEvent) => {
//               handleSubmitButtonClick(clickEvent);
//             }}
//           >
//             Submit Task
//           </Button>
//           </>
//           :""
//           }
//         </Form>
//       </Container>
//     </>
//   );
  
 
// };
//last version end of code



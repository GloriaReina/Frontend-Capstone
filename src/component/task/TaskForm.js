import { useState } from "react";
import { Button, Form, Container, Row, Col, CloseButton, ButtonToolbar } from "react-bootstrap";

export const TaskForm = ({ taskSubmitted }) => {
    /*
          TODO: Add the correct default properties to the
          initial state object
      */
  
    const [task, update] = useState({
        userId: 0,
        description: "",
        category: "",
        urgencyLevel: 0,
        deadline: "",
        estimatedTime: "",
        actualTime: "",
        completed: false
    });
    
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleAddTaskForm = () => {
        setIsFormVisible(!isFormVisible);
      };
   
  
    const localAppUser = localStorage.getItem("app_user");
    const appUserObject = JSON.parse(localAppUser);
  
    const handleSubmitButtonClick = (event) => {
      event.preventDefault();
  
      // TODO: Create the object to be saved to the API
      const taskToSendToAPI = {
        userId: appUserObject.id,
        description: task.description,
        category:task.category,
        urgencyLevel:task.urgencyLevel,
        deadline: task.deadline,
        estimatedTime:task.estimatedTime,
        actualTime:task.actualTime,
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
          taskSubmitted();
        })
        .then(() => {
           /* update function resets form fields to default values so user can submit another task without having to manually clear the form */ 
          update({ userId: 0,
            description: "",
            category: "",
            urgencyLevel: 0,
            deadline: "",
            estimatedTime: "",
            actualTime: "",
            completed: false });
        })
        .then(() => {
          toggleAddTaskForm();
        });
    };
  
    return (
<>
      {/* {isFormVisible} */}
      <Container>

        <div className="add-new-task-button">
              <ButtonToolbar
                bsPrefix="newtask-button"
                variant="success"
                block={false}
                onClick= {toggleAddTaskForm}
              >
                + New Task
              </ButtonToolbar>
        </div> 
        <Form>
          <div className="add-task-close-button">
            <CloseButton type="button" onClick={toggleAddTaskForm}></CloseButton>
          </div>
          <Form.Group as={Row} controlId="urgency">
        <Form.Label column sm={2}>Urgency:</Form.Label>
        <Col sm={10}>
          <Form.Control as="select" 
          value={task.urgency} 
          onChange={(evt) => {
            const copy = { ...task };
            copy.urgency = evt.target.value;
            update(copy);
          }} >
            <option value="">-- Select Urgency --</option>
            <option value="Urgent and Important">Urgent and Important</option>
            <option value="Urgent but not important">Urgent but not important</option>
            <option value="Not Urgent but important">Not Urgent but important</option>
            <option value="Not Urgent and Not important">Not Urgent and Not important</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="category">
        <Form.Label column sm={2}>Category:</Form.Label>
        <Col sm={10}>
          <Form.Control as="select" 
          value={task.category} 
          onChange={(evt) => {
            const copy = { ...task };
            copy.category = evt.target.value;
            update(copy);
          }}  >
            <option value="">-- Select Category --</option>
            <option value="Self care">Self care</option>
            <option value="family-life">Family life</option>
            <option value="work-life">Work life</option>
          </Form.Control>
        </Col>
      </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Description:</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter task description"
              value={task.description}
              onChange={(evt) => {
                const copy = { ...task };
                copy.description = evt.target.value;
                update(copy);
              }}  
            />
          </Form.Group>
  
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Deadline:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Due Date"
              value={task.deadline}
              onChange={(evt) => {
                const copy = { ...task };
                copy.deadline = evt.target.value;
                update(copy);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Estimated Time:</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Length of time needed (min) "
              value={task.estimatedTime}
              onChange={(evt) => {
                const copy = { ...task };
                copy.estimatedTime = evt.target.value;
                update(copy);
              }}  
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Completion Time:</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Length of time used (min) "
              value={task.actualTime}
              onChange={(evt) => {
                const copy = { ...task };
                copy.actualTime = evt.target.value;
                update(copy);
              }}  
            />
          </Form.Group>
  
          <Button
            variant="success"
            bsPrefix="submit-task-button"
            onClick={(clickEvent) => {
              handleSubmitButtonClick(clickEvent);
            }}
          >
            Submit Task
          </Button>
        </Form>
      </Container>
      </>
    );
  };
  
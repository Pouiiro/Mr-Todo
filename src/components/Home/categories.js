import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import uuid from 'react-uuid'

const ModalExample1 = ({ statt, updateCats }, props) => {
  const { className } = props
  const [modal, setModal] = useState(false)
  const [nestedModal, setNestedModal] = useState(false)
  const toggle = () => setModal(!modal)
  const toggleNested = () => {
    setNestedModal(!nestedModal)
  }

  let [options, setOptions] = useState(statt.options)

  const removeCat = ids => {
    var index = null
    for (var i = 0; i < options.length; i++) {
      if (options[i].id === ids) {
        index = i
      }
    }
    options.splice(index, 1)
    statt.options = options
    setOptions(statt.options)
    update()
  }

  useEffect(() => console.log(''), [options])

  let textInput = React.createRef()
  const update = () => updateCats()
  const handleSubmit = e => {
    e.preventDefault()
    const newCat = textInput.current.value
    const newArr = { value: newCat, label: newCat, id: uuid() }
    statt.options.push(newArr)
    setOptions(statt.options)
    toggleNested()
    update()
  }

  const optionsList = statt.options.map(op => {
    return (
      <div key={op.id}>
        <ListGroup>
          <ListGroupItem action variant="light" id="lord">
            {op.value}
            <i
              className="fas fa-eraser float-right"
              variant="outline-dark"
              size="sm"
              onClick={() => removeCat(op.id)}
            />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  })

  return (
    <div>
      <span onClick={toggle}>Categories</span>
      <Modal
        centered
        size="md"
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Categories</ModalHeader>
        <ModalBody>
          {optionsList}
          <br />
          <Button outline color="info" onClick={toggleNested}>
            New Category
          </Button>
          <Modal isOpen={nestedModal} toggle={toggleNested} centered>
            <ModalHeader>New Category</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  handleSubmit(e)
                }}
              >
                <FormGroup>
                  <FormControl
                    required
                    type="text"
                    placeholder="Category title"
                    ref={textInput}
                  />
                </FormGroup>
                <Button outline color="info" type="submit">
                  Add
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleNested}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalExample1

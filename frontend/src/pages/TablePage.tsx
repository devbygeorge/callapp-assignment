import { useState } from "react";

import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { Link } from "react-router-dom";

import usePersonsStore from "@/hooks/usePersonsStore";
import { FormData, FormField } from "@/types/form";
import { Person } from "@/types/person";

const { Option } = Select;

function TablePage() {
  const [currentPersonId, setCurrentPersonId] = useState<null | number>(null);
  const [isModalVisible, setModalVisile] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);

  const [form] = Form.useForm();
  const { persons, deletePerson, updatePerson, addPerson } = usePersonsStore(
    (state) => state
  );

  const handleSubmit = async (data: FormData) => {
    try {
      const { name, email, gender, street, city, phone } = data;
      const person = {
        id: currentPersonId,
        name,
        email,
        gender,
        address: {
          street,
          city,
        },
        phone,
      };

      if (currentPersonId !== null) {
        await updatePerson(person);
        message.info(`Person with the name ${person.name} updated`);
      } else {
        await addPerson(person);
        message.info(`Person with the name ${person.name} added`);
      }
    } catch (err) {
      console.error(err);
      message.info("Something happened on server");
    } finally {
      setModalVisile(false);
    }
  };

  const handleRowDoubleClick = (person: Person) => {
    form.resetFields();
    setCurrentPersonId(person.id);
    setModalVisile(true);
    setFields([
      { name: ["name"], value: person["name"] },
      { name: ["email"], value: person["email"] },
      { name: ["gender"], value: person["gender"] },
      { name: ["street"], value: person["address"]["street"] },
      { name: ["city"], value: person["address"]["city"] },
      { name: ["phone"], value: person["phone"] },
    ]);
  };

  const handleAddPersonClick = () => {
    form.resetFields();
    setCurrentPersonId(null);
    setModalVisile(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street: string; city: string }) =>
        `${address.street}, ${address.city}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: void, record: Person) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deletePerson(record.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={persons}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onDoubleClick: () => handleRowDoubleClick(record),
        })}
      />

      <Modal
        title={currentPersonId !== null ? "Edit Person" : "Add Person"}
        open={isModalVisible}
        onCancel={() => setModalVisile(false)}
        footer={null}
      >
        <Form form={form} fields={fields} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Please enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>

          <Form.Item
            name="gender"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Select placeholder="Please select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="street"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Please enter your street" />
          </Form.Item>

          <Form.Item
            name="city"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Please enter your city" />
          </Form.Item>

          <Form.Item
            name="phone"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Please enter your phone" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            Submit
          </Button>
        </Form>
      </Modal>

      <Button type="primary" className="button" onClick={handleAddPersonClick}>
        Add Person
      </Button>
      <Button type="link" className="button">
        <Link to="/chart">See Chart</Link>
      </Button>
    </>
  );
}

export default TablePage;

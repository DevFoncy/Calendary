/**
 *
 * ReminderComponent
 *
 */

import React, { Fragment } from 'react';

import './index.less';
import {
  Modal,
  Input,
  TimePicker,
  Select,
  Typography,
  Badge,
  Button,
} from 'antd';
import moment from 'moment';
const { Option } = Select;
const { Text } = Typography;
export class ReminderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: {
        text: '',
        time: '',
        city: 'Lima,PE',
        color: 'processing',
        dateSelected: '',
      },
      hasReminder: false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    let flag = -1;
    if (nextProps.reminders.length > 0) {
      nextProps.reminders.map(reminder => {
        if (reminder.dateSelected.date() === nextProps.dateSelected.date()) {
          flag = 1;
          this.setState({
            hasReminder: true,
            reminder: {
              ...this.state.reminder,
              text: reminder.text,
              city: reminder.city,
              color: reminder.color,
              dateSelected: nextProps.dateSelected,
            },
          });
        } else {
          flag !== 1 && this.setState({ hasReminder: false });
        }
      });
    } else {
      this.setState({ hasReminder: false });
    }
    if (flag !== 1) {
      this.setState({
        reminder: {
          ...this.state.reminder,
          dateSelected: nextProps.dateSelected,
          text: '',
          city: 'Lima,PE',
          color: 'processing',
        },
      });
    }
  }

  onChangeTime = (time, timeString) => {
    this.setState({ reminder: { ...this.state.reminder, time: timeString } });
  };

  handleChange = value => {
    this.setState({ reminder: { ...this.state.reminder, color: value } });
  };

  onChange = event => {
    this.setState({
      reminder: {
        ...this.state.reminder,
        [event.target.name]: event.target.value,
      },
    });
  };

  validate = reminder => {
    let countErrors = 0;
    if (reminder.text === '') {
      countErrors++;
    }
    if (reminder.city === '') {
      countErrors++;
    }
    return countErrors > 0;
  };

  onSubmit = () => {
    const { reminder } = this.state;
    if (this.validate(reminder)) {
      message.error('Please complete the field', 3);
    } else {
      this.props.handleOk(reminder);
    }
  };

  render() {
    const { reminder } = this.state;
    return (
      <div className="ReminderComponent">
        <Modal
          title="Create Reminder"
          x
          visible={this.props.showModal}
          onOk={this.onSubmit}
          onCancel={this.props.handleCancel}
        >
          <div className="ReminderComponent-Section">
            <div className="ReminderComponent-Section-Input">
              <Text type="warning">Text</Text>
              <Input
                required
                value={reminder.text}
                placeholder="Please enter the text of the reminder"
                maxLength="30"
                name="text"
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="ReminderComponent-Section-Input">
              <Text type="warning">Time</Text>
              <br />
              <TimePicker
                onChange={this.onChangeTime}
                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div className="ReminderComponent-Section-Input">
                <Text type="warning">City</Text> <br />
                <Select
                  value={reminder.city}
                  defaultValue="Lima,PE"
                  onChange={e =>
                    this.setState({
                      reminder: { ...this.state.reminder, city: e },
                    })
                  }
                >
                  <Option value="Lima,PE"> Lima </Option>
                  <Option value="London,uk"> London </Option>
                  <Option value="Colombia,CO"> Colombia </Option>
                  <Option value="Utah, US"> Utah </Option>
                  <Option value="Kingdom, US"> Kingdom </Option>
                </Select>
              </div>
              <div className="ReminderComponent-Section-Input">
                <Text type="warning">Color</Text>
                <br />
                <Select
                  value={reminder.color}
                  defaultValue="processing"
                  onChange={e => this.handleChange(e)}
                >
                  <Option value="error">
                    {' '}
                    <Badge status="error" text="Red" />
                  </Option>
                  <Option value="processing">
                    <Badge status="processing" text="Blue" />
                  </Option>
                  <Option value="warning">
                    <Badge status="warning" text="Orange" />
                  </Option>
                  <Option value="success">
                    {' '}
                    <Badge status="success" text="Success" />
                  </Option>
                  <Option value="default">
                    {' '}
                    <Badge status="default" text="Default" />
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          {this.state.hasReminder && (
            <Button
              type="danger"
              onClick={() => this.props.deleteReminder(reminder.dateSelected)}
            >
              Delete reminder
            </Button>
          )}
        </Modal>
      </div>
    );
  }
}

ReminderComponent.propTypes = {};

export default ReminderComponent;

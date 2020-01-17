/**
 *
 * CalendaryComponent
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import './index.less';
import { Calendar, Badge, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/es-us';
import ReminderComponent from '../ReminderComponent';

moment.locale('es-us');

export class CalendaryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      valueSelected: moment(),
      showModal: false,
      reminders: [],
    };
  }

  onSelect = value => {
    this.setState({ value, valueSelected: value, showModal: true });
  };

  getListData = (valueCalendar, reminder) => {
    let listData;
    // console.log('reminder',reminder);
    if (reminder) {
      if (reminder.dateSelected.date() === valueCalendar.date()) {
        listData = [
          { type: reminder.color, content: reminder.text },
          { type: reminder.color, content: reminder.time },
          { type: reminder.color, content: reminder.city },
        ];
      }
      return listData || [];
    }
  };

  dateCellRender = (value, reminders) => {
    let flag = -1;
    let data = [];
    if (reminders[0]) {
      reminders.map(r => {
        const listData = this.getListData(value, r);
        if (listData.length > 0) {
          flag = 1;
          data = listData;
        }
      });
    }

    if (flag === 1) {
      return (
        <ul className="events">
          {data.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
  };

  handleOk = reminder => {
    const { reminders } = this.state;
    let flag = -1;
    reminders.map((r, index) => {
      if (r.dateSelected.date() === reminder.dateSelected.date()) {
        flag = 1;
        reminders[index] = reminder; // update
      }
    });
    if (flag === -1) {
      // new
      reminders.push(reminder);
    }
    this.props.callMethod(reminder);
    message.success('Reminder was added succesful ', 3);
    this.setState({
      showModal: false,
      reminders,
    });
  };

  handleCancel = e => {
    this.setState({
      showModal: false,
    });
  };

  deleteReminder = dateSelected => {
    const { reminders } = this.state;
    let position = -1;
    reminders.map((r, index) => {
      if (r.dateSelected.date() === dateSelected.date()) {
        position = index;
      }
    });
    position > -1 && reminders.splice(position, 1);
    message.success('Reminder was deleted succesful ', 3);
    this.setState({
      showModal: false,
      reminders,
    });
  };

  render() {
    const { value, valueSelected, reminders } = this.state;
    return (
      <div className="CalendaryComponent">
        <Calendar
          dateCellRender={value => this.dateCellRender(value, reminders)}
          value={value}
          onSelect={this.onSelect}
        />
        <ReminderComponent
          reminders={reminders}
          deleteReminder={this.deleteReminder}
          dateSelected={value}
          showModal={this.state.showModal}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

CalendaryComponent.propTypes = {};

export default CalendaryComponent;

import React, { Component } from 'react';

class Staff extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onClick(this.props.staffs, e.target.value, e.target.id);
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Checkbox</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Teams</th>
            <th scope="col">Tags</th>
          </tr>
        </thead>
        <tbody>
          {this.props.staffs.map(staff => (
            <tr>
              <td><input type="checkbox" aria-label="Checkbox for selecting staff" id={staff.id} checked={staff.isChecked} onChange={this.handleChange} /></td>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.teams}</td>
              <td>{staff.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Staff;

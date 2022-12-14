/*
 * A simple React component
 */
class Application extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        project: "",
        activity: "",
        from: "",
        to: "",
        note: "",
        billable: "",
        time: "",
        edditing: false,
        data: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.deleteRecord = this.deleteRecord.bind(this);
      this.edditRecord = this.edditRecord.bind(this);
      this.confirmDeletion = this.confirmDeletion.bind(this);
      this.confirmEdditing = this.confirmEdditing.bind(this);
      this.clearFormData = this.clearFormData.bind(this);
      this.totalTime = this.totalTime.bind(this);
    }
  
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    confirmDeletion(callback, index) {
      swal(
        {
          title: "Are you sure?",
          text: "Would you like to delete this document?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        (deletionConfirmed) => {
          if (deletionConfirmed) {
            callback(index);
            swal("Deleted!", "Your document has been deleted.", "success");
          } else {
            swal("Cancelled!", "Your document  was not deleted.", "error");
          }
        }
      );
    }
  
    confirmEdditing(callback, index, clearData) {
      swal(
        {
          title: "Are you sure?",
          text: "Would you like to eddit this document?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        (edditingConfirmed) => {
          if (edditingConfirmed) {
            callback(index);
            this.setState({ edditing: false });
            clearData();
            swal("Editted!", "Your document has been Editted.", "success");
          } else {
            this.setState({ edditing: false });
            swal("Cancelled!", "Your document  was not Editted.", "error");
          }
        }
      );
    }
  
    clearFormData() {
      this.setState({
        project: "",
        activity: "",
        from: "",
        to: "",
        note: "",
        billable: "",
        time: ""
      });
    }
    deleteRecord(index) {
      let temp = this.state.data;
      this.setState({ data: temp.filter((newInfo, i) => i !== index) });
    }
    edditRecord(index) {
      let temp = this.state.data;
      this.setState({
        data: temp.map((oldInfo, pos) => {
          if (pos === index) {
            return this.state;
          }
          return oldInfo;
        })
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const time = Math.abs(parseInt(this.state.to) - parseInt(this.state.from));
      this.state.time = time;
      if (this.state.edditing) {
        this.confirmEdditing(
          this.edditRecord,
          this.state.index,
          this.clearFormData
        );
        return null;
      }
      this.state.data.push(this.state);
      this.setState({ data: this.state.data });
      this.clearFormData();
    }
    totalTime() {
      let sum = 0;
      this.state.data.forEach((info) => {
        sum += info.time;
      });
      return sum;
    }
  
    render() {
      return (
        <div>
          <h1 style={{fontSize: "80px",  padding: "40px 0 40px 0"}}>Time Sheet</h1>
          <p>Test out by entering data. You can after delete or edit.</p>
  
          <br />
          {!this.state.edditing ? (
            <form className="report" onSubmit={this.handleSubmit}>
              <div className="col-left">
                <label>
                  Project
                  <select
                    name="project"
                    value={this.state.project}
                    onChange={this.handleChange}
                    id="project"
                  >
                    <option value="">Please select project...</option>
                    <option value="project1">Project 1</option>
                    <option value="project2">Project 2</option>
                    <option value="project3">Project 3</option>
                  </select>
                </label>
                <label>
                  Activity
                  <select
                    name="activity"
                    value={this.state.activity}
                    onChange={this.handleChange}
                    id="activity"
                  >
                    <option value="">Please select activity...</option>
                    <option value="activity1">Activity 1</option>
                    <option value="activity2">Activity 2</option>
                    <option value="activity3">Activity 3</option>
                  </select>
                </label>
                <div className="pair">
                  <label className="pair-left">
                    From
                    <input
                      type="time"
                      value={this.state.from}
                      onChange={this.handleChange}
                      name="from"
                      id="from"
                    />
                  </label>
                  <label className="pair-right">
                    To
                    <input
                      type="time"
                      value={this.state.to}
                      onChange={this.handleChange}
                      name="to"
                      id="to"
                    />
                  </label>
                </div>
                <label className="checkbox">
                  <span>Billable</span>
                  <input
                    type="checkbox"
                    value={this.state.checkbox}
                    onChange={this.handleChange}
                    name="billable"
                    id="billable"
                  />
                </label>
              </div>
              <div className="col-right">
                <label>
                  Note
                  <textarea
                    name="note"
                    value={this.state.note}
                    onChange={this.handleChange}
                    id="note"
                    cols="30"
                    rows="10"
                  ></textarea>
                </label>
                <button type="submit">Save</button>
              </div>
            </form>
          ) : (
            <form className="report" onSubmit={this.handleSubmit}>
              <div className="col-left">
                <label>
                  Project
                  <select
                    name="project"
                    value={this.state.project}
                    onChange={this.handleChange}
                    id="project"
                  >
                    <option value="">Please select project...</option>
                    <option value="project1">Project 1</option>
                    <option value="project2">Project 2</option>
                    <option value="project3">Project 3</option>
                  </select>
                </label>
                <label>
                  Activity
                  <select
                    name="activity"
                    value={this.state.activity}
                    onChange={this.handleChange}
                    id="activity"
                  >
                    <option value="">Please select activity...</option>
                    <option value="activity1">Activity 1</option>
                    <option value="activity2">Activity 2</option>
                    <option value="activity3">Activity 3</option>
                  </select>
                </label>
                <div className="pair">
                  <label className="pair-left">
                    From
                    <input
                      type="time"
                      value={this.state.from}
                      onChange={this.handleChange}
                      name="from"
                      id="from"
                    />
                  </label>
                  <label className="pair-right">
                    To
                    <input
                      type="time"
                      value={this.state.to}
                      onChange={this.handleChange}
                      name="to"
                      id="to"
                    />
                  </label>
                </div>
                <label className="checkbox">
                  <span>Billable</span>
                  <input
                    type="checkbox"
                    value={this.state.checkbox}
                    onChange={this.handleChange}
                    name="billable"
                    id="billable"
                  />
                </label>
              </div>
              <div className="col-right">
                <label>
                  Note
                  <textarea
                    name="note"
                    value={this.state.note}
                    onChange={this.handleChange}
                    id="note"
                    cols="30"
                    rows="10"
                  ></textarea>
                </label>
                <button type="submit">Save</button>
              </div>
            </form>
          )}
  
          {this.state.data[0] ? (
            <table>
              <caption>Reported (14 april 2016)</caption>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Activity</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Note</th>
                  <th>Action</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colspan="7">Sum total time: {this.totalTime()}</td>
                </tr>
              </tfoot>
              <tbody>
                {this.state.data.map((info, index) => (
                  <tr key={index}>
                    <td>{info.project}</td>
                    <td>{info.activity}</td>
                    <td>{info.from}</td>
                    <td>{info.to}</td>
                    <td>{info.note}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.setState({ edditing: true, index });
                          this.clearFormData();
                          swal("please go back to form and edit");
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{ color: "black" }}>
                      <button
                        onClick={() => {
                          this.confirmDeletion(this.deleteRecord, index);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
  
  /*
   * Render the above component into the div#app
   */
  React.render(<Application />, document.getElementById("app"));
  
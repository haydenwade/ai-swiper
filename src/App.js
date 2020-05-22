import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container, Row, Col, Button, Carousel, Spinner,Jumbotron } from 'react-bootstrap';

import { api } from './helpers/api';

export default class App extends React.Component {
  state = {
    profiles: [],
    currentProfile: 0,
    loading: true
  }
  componentDidMount() {
    this.fetchProfiles();
  }
  fetchProfiles = async () => {
    const resp = await api.getProfiles();
    this.setState({ profiles: resp.data, loading: false });
  }
  like = async () => {
    const p = this.state.profiles[this.state.currentProfile];
    await api.like(p.id, p.s_number);
    this.updateCurrentProfile()
  }
  dislike = async () => {
    const p = this.state.profiles[this.state.currentProfile];
    await api.dislike(p.id, p.s_number);
    this.updateCurrentProfile()
  }
  updateCurrentProfile = () => {
    let index = this.state.currentProfile + 1;
    if (index >= this.state.profiles.length) {
      index = 0;
      this.fetchProfiles();
    }
    this.setState({ currentProfile: index })
  }
  render() {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h1><strong>AI SWIPER</strong></h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            {this.state.loading && <React.Fragment>
              <h2>Loading...</h2>
              <Spinner animation="grow" />
            </React.Fragment>}
            {!this.state.loading && this.state.profiles.length > 0 &&
              <Carousel>
                {this.state.profiles[this.state.currentProfile].photos.map((p, i) => {
                  return <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={p.url}
                    />
                  </Carousel.Item>
                })
                }
              </Carousel>
            }
          </Col>
          <Col>
            <Row>
              <Col className="text-center">
                <Button onClick={this.dislike} style={{ width: '100%' }}>Dislike</Button>
              </Col>
              <Col className="text-center">
                <Button onClick={this.like} style={{ width: '100%' }}>Like</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {!this.state.loading && this.state.profiles.length > 0 &&
                  <React.Fragment>
                    {this.state.profiles[this.state.currentProfile].name}
                    <br />
                    {this.state.profiles[this.state.currentProfile].bio}
                  </React.Fragment>
                }
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Jumbotron className="text-center">
                  <h2>Prediction:</h2>
                  <Spinner animation="grow" />
                  <div style={{color:'red', fontSize:30}}>no match</div>
                  <div style={{color:'green', fontSize:30}}>match</div>
                </Jumbotron>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
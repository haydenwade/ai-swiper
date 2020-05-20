import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';

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
            <Button onClick={this.dislike}>Dislike</Button>
            <Button onClick={this.like}>Like</Button>
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
        <Row>
          <Col className="text-center">
            {this.state.loading && <h2>Loading...</h2>}
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
        </Row>
      </Container>
    );
  }
}
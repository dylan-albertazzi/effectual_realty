import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function AppFooter() {
  return (
    <Container className="fixed-bottom">
      <Row>
        <Col>
          <p className="small">Footer content</p>
        </Col>
        <Col>
          <p className="small">Footer content</p>
        </Col>
        <Col>
          <p className="small">Footer content</p>
        </Col>
        <Col>
          <p className="small">Footer content</p>
        </Col>
      </Row>
    </Container>
  );
}

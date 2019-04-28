import React, {PureComponent} from "react";
import {Col, Container, Jumbotron, Row} from "reactstrap";
import {ScoreDisplay} from "./ScoreDisplay";
import {ScoreChangeButtonBar} from "./ScoreChangeButtonBar";
import {ScoreHistory} from "./ScoreHistory";

export class MainLayout extends PureComponent {
    render() {
        return <Container>
            <Row>
                <Col md={6}>
                    <Jumbotron>
                        <div id="score_display" className="lead"><ScoreDisplay/></div>

                        <div className="lead"><ScoreChangeButtonBar /></div>
                    </Jumbotron>
                </Col>

                <Col md={6}>
                    <ScoreHistory />
                </Col>
            </Row>
        </Container>
    }
}

import React, {PureComponent} from "react";
import {Col, Container, Jumbotron, Row} from "reactstrap";
import {ScoreDisplay} from "./ScoreDisplay";
import {ScoreChangeButtonBar} from "./ScoreChangeButtonBar";
import {ScoreHistory} from "./ScoreHistory";
import {ScoreColorPickers} from "./ScoreColorPickers";

export class MainLayout extends PureComponent {
    render() {
        return <Container>
            <Row>
                <Col md={6}>
                    <Jumbotron>
                        <div id="score_display" className="lead"><ScoreDisplay/></div>

                        <div className="lead"><ScoreChangeButtonBar /></div>

                        <div className="lead"><ScoreColorPickers /></div>
                    </Jumbotron>
                </Col>

                <Col md={6}>
                    <ScoreHistory />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <p className="footer">
                        Made by <a href="https://twitter.com/98810f8c06" className="discreet-link">Franck Michea</a> &mdash;{' '}
                        <a href="https://github.com/fmichea/chess-score-tracker" className="discreet-link">
                            <i className="fa fa-github"></i> Sources
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    }
}

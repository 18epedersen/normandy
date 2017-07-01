import { Card, Col, Row } from 'antd';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import QueryRecipe from 'control_new/components/data/QueryRecipe';
import QueryRecipeHistory from 'control_new/components/data/QueryRecipeHistory';
import Details from 'control_new/components/recipes/Details';
import DetailsActionBar from 'control_new/components/recipes/DetailsActionBar';
import HistoryTimeline from 'control_new/components/recipes/HistoryTimeline';
import {
  getLatestRevisionIdForRecipe,
  getRecipeHistory,
} from 'control_new/state/recipes/selectors';
import { getRevision } from 'control_new/state/revisions/selectors';
import { getUrlParam, getUrlParamAsInt } from 'control_new/state/router/selectors';


@connect(
  state => {
    const recipeId = getUrlParamAsInt(state, 'recipeId');
    const latestRevisionId = getLatestRevisionIdForRecipe(state, recipeId);
    const revisionId = getUrlParam(state, 'revisionId', latestRevisionId);
    const revision = getRevision(state, revisionId, new Map());

    return {
      history: getRecipeHistory(state, recipeId),
      recipeId,
      revision,
      revisionId,
    };
  }
)
export default class DetailPage extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    recipeId: PropTypes.number.isRequired,
    revision: PropTypes.object,
    revisionId: PropTypes.string,
  }

  render() {
    const { history, recipeId, revision, revisionId } = this.props;
    return (
      <div className="page-recipe-details">
        <QueryRecipe pk={recipeId} />
        <QueryRecipeHistory pk={recipeId} />
        <Row gutter={24}>
          <Col span={16}>
            <DetailsActionBar />
            <Details recipe={revision.get('recipe', new Map())} />
          </Col>
          <Col span={8} className="recipe-history">
            <Card title="History">
              <HistoryTimeline history={history} selectedRevisionId={revisionId} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

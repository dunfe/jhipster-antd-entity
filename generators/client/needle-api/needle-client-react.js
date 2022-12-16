/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');
const _ = require('lodash');
const needleClientBase = require('generator-jhipster/generators/client/needle-api/needle-client');

module.exports = class extends needleClientBase {
  addEntityToMenu(routerName, enableTranslation, entityTranslationKeyMenu, entityTranslationValue = _.startCase(routerName)) {
    const errorMessage = `${chalk.yellow('Reference to ') + routerName} ${chalk.yellow('not added to menu.\n')}`;
    const entityMenuPath = `${this.CLIENT_MAIN_SRC_DIR}app/entities/menu.tsx`;
    const label = this.jhipsterContext.stripMargin(`|<a href="/${routerName}" target="_blank" rel="noopener noreferrer">
                                                          |${
                                                            enableTranslation
                                                              ? `<Translate contentKey="global.menu.entities.${entityTranslationKeyMenu}" />`
                                                              : `${entityTranslationValue}`
                                                          }
                                                          |</a>`);
    const entityEntry = `${JSON.stringify({
      label,
      key: routerName,
    })},`;
    const rewriteFileModel = this.generateFileModel(entityMenuPath, 'jhipster-needle-add-entity-to-menu', entityEntry);

    this.addBlockContentToFile(rewriteFileModel, errorMessage);
  }
};

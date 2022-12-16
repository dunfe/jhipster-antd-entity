/**
 * Copyright 2013-2021 the original author or authors from the JHipster project.
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
const constants = require('generator-jhipster/generators/generator-constants');

/* Constants use throughout */
const { REACT_DIR } = constants;

const CLIENT_REACT_TEMPLATES_DIR = 'react';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

const reactFiles = {
  entities: {
    path: REACT_DIR,
    templates: ['entities/menu.tsx', 'entities/reducers.ts', 'entities/routes.tsx'],
  },
};

function addSampleRegexTestingStrings(generator) {
  generator.fields.forEach(field => {
    if (field.fieldValidateRulesPattern !== undefined) {
      const randExp = field.createRandexp();
      field.fieldValidateSampleString = randExp.gen();
      field.fieldValidateModifiedString = randExp.gen();
    }
  });
}

function writeFiles() {
  return {
    writeClientFiles() {
      if (
        this.skipClient ||
        (this.jhipsterConfig.microfrontend && this.jhipsterConfig.applicationType === 'gateway' && this.microserviceName)
      )
        return undefined;
      if (this.protractorTests) {
        addSampleRegexTestingStrings(this);
      }

      let files;
      let clientMainSrcDir;
      let templatesDir;

      if (this.clientFramework === 'react') {
        files = reactFiles;
        // eslint-disable-next-line no-unused-vars
        clientMainSrcDir = REACT_DIR;
        templatesDir = CLIENT_REACT_TEMPLATES_DIR;
      }

      if (!files) return undefined;

      return this.writeFilesToDisk(files, templatesDir);
    },
  };
}

module.exports = {
  writeFiles,
  reactFiles,
};

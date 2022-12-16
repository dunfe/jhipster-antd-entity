import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/esm/generators/client';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  COMPOSING_PRIORITY,
  LOADING_PRIORITY,
  PREPARING_PRIORITY,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  INSTALL_PRIORITY,
  POST_INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';
import { cleanup as cleanupReact, writeFiles as writeReactFiles } from './files-react.js';
import { cleanup as cleanupAngular, writeFiles as writeAngularFiles } from 'generator-jhipster/generators/client/files-angular.js';
import { cleanup as cleanupVue, writeFiles as writeVueFiles } from 'generator-jhipster/generators/client/files-vue.js';
import { writeFiles as writeCommonFiles } from "generator-jhipster/generators/client/files-common.js";

export default class extends ClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints jhipster-antd-entity')}`
      );
    }

    this.sbsBlueprint = true;
  }

  get [WRITING_PRIORITY]() {
    return {
      // async writingTemplateTask() {
      //   (await files).writeFiles.call(this);
      // },
      cleanupReact,
      write() {
        if (this.skipClient) return;
        switch (this.clientFramework) {
          case "angular":
            return writeAngularFiles.call(this);
          case "react":
            return writeReactFiles.call(this);
          case "vue":
            return writeVueFiles.call(this);
          default:
          // do nothing by default
        }
      },
    };
  }

  get [POST_WRITING_PRIORITY]() {
    console.log(this.clientReact);
    return {
      async writingTemplateTask() {
        this.addEntityToMenu = null;
      },
    };
  }
}

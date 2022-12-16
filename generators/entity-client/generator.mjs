import EntityClientGenerator from "generator-jhipster/esm/generators/entity-client";
import {
  PRIORITY_PREFIX,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  POST_WRITING_ENTITIES_PRIORITY,
  END_PRIORITY, WRITING_ENTITIES_PRIORITY
} from "generator-jhipster/esm/priorities";
import _ from 'lodash';
import chalk from 'chalk';
import { addToMenu } from "generator-jhipster/generators/entity-client/files.js";
const files = import("./files.cjs");

export default class extends EntityClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like jhipster --blueprints jhipster-antd-entity')}`
      );
    }

    this.sbsBlueprint = true;
  }

  get [DEFAULT_PRIORITY]() {
    if (this.delegateToBlueprint) return {};
    return this._default();
  }

  get [POST_WRITING_PRIORITY]() {
    return {
      async addToMenu() {
        if (this.skipClient) return undefined;
        return (await files).addToMenu.call(this);
      }
    };
  }

  get [POST_WRITING_ENTITIES_PRIORITY]() {
    return {
      async postWritingTemplateTask() {
        this.addToMenu = null;
      },
      async addToMenu() {
        if (this.skipClient) return undefined;
        return (await files).addToMenu.call(this);
      }
    };
  }

    get [END_PRIORITY]() {
      return {
        async endTemplateTask() {
        }
      };
    }
  }

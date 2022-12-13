import EntityClientGenerator from 'generator-jhipster/esm/generators/entity-client';
import {
  PRIORITY_PREFIX,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';
const writeFiles = import('./files.cjs');

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
    return {
      async defaultTemplateTask() {},
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {
        (await writeFiles).writeFiles.call(this);
      },
    };
  }

  get [POST_WRITING_PRIORITY]() {
    return {
      async postWritingTemplateTask() {},
    };
  }

  get [END_PRIORITY]() {
    return {
      async endTemplateTask() {},
    };
  }
}

import chalk from 'chalk';
import EntityClientGenerator from 'generator-jhipster/esm/generators/entity-client';
import {
  PRIORITY_PREFIX,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';

export default class extends EntityClientGenerator {
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

  get [DEFAULT_PRIORITY]() {
    return {
      async defaultTemplateTask() {},
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {
        await this.writeFiles({
          sections: {
            files: [
              {
                templates: {
                  react: {
                    src: {
                      main: {
                        webapp: {
                          app: {
                            entities: [
                              'entity-delete-dialog.tsx.ejs',
                              'entity-detail.tsx.ejs',
                              'entity-update.tsx.ejs',
                              'entity.model.ts.ejs',
                              'entity.reducer.ts.ejs',
                              'entity.tsx.ejs',
                              'index.tsx.ejs',
                              'react_validators.ejs',
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          context: this,
        });
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

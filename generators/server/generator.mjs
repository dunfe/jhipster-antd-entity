import chalk from 'chalk';
import ServerGenerator from 'generator-jhipster/esm/generators/server';
import { PRIORITY_PREFIX, POST_WRITING_PRIORITY } from 'generator-jhipster/esm/priorities';

export default class extends ServerGenerator {
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

  get [POST_WRITING_PRIORITY]() {
    return {
      async packageJson() {
        this.packageJson.merge({
          dependencies: {
            "antd": "5.0.7",
            "@ant-design/icons": "4.8.0"
          },
        });
      },
    };
  }
}

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HubspotFormService extends Service {
  @tracked isFormReady = false;
  @tracked isSuccessSubmitted = false;
}

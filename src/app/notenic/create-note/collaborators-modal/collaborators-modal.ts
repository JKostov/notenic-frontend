import { CollaboratorsModalComponent, ICollaboratorsModalContext } from './collaborators-modal.component';
import { ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { User } from '@notenic/models';

export class CollaboratorsModal extends ComponentModalConfig<ICollaboratorsModalContext, User[], void> {
  constructor(title: string, max: number = 5, collaborators = [], size = ModalSize.Small) {
    super(CollaboratorsModalComponent, { title, max, collaborators });

    this.isClosable = false;
    this.transitionDuration = 200;
    this.size = size;
  }
}

import { ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { User } from '@notenic/models';
import {
  IShowCollaboratorsModalContext,
  ShowCollaboratorsModalComponent
} from '@notenic/note-page/show-collaborators-modal/show-collaborators-modal.component';

export class ShowCollaboratorsModal extends ComponentModalConfig<IShowCollaboratorsModalContext, User[], void> {
  constructor(title: string, id: string, size = ModalSize.Small) {
    super(ShowCollaboratorsModalComponent, { title, id });

    this.isClosable = false;
    this.transitionDuration = 200;
    this.size = size;
  }
}

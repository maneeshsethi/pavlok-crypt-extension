import { DialogModule, DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { ButtonModule } from "../button";

import { DialogService } from "./dialog.service";
import { DialogCloseDirective } from "./directives/dialog-close.directive";
import { DialogTitleContainerDirective } from "./directives/dialog-title-container.directive";
import { SimpleDialogComponent } from "./simple-dialog/simple-dialog.component";

interface Animal {
  animal: string;
}

@Component({
  selector: "app-story-dialog",
  template: `<button bitButton (click)="openDialog()">Open Simple Dialog</button>`,
})
class StoryDialogComponent {
  constructor(public dialogService: DialogService) {}

  openDialog() {
    this.dialogService.open(StoryDialogContentComponent, {
      data: {
        animal: "panda",
      },
    });
  }
}

@Component({
  selector: "story-dialog-content",
  template: `
    <bit-simple-dialog>
      <span bitDialogTitle>Dialog Title</span>
      <span bitDialogContent>
        Dialog body text goes here.
        <br />
        Animal: {{ animal }}
      </span>
      <div bitDialogFooter class="tw-flex tw-flex-row tw-gap-2">
        <button bitButton buttonType="primary" (click)="dialogRef.close()">Save</button>
        <button bitButton buttonType="secondary" bitDialogClose>Cancel</button>
      </div>
    </bit-simple-dialog>
  `,
})
class StoryDialogContentComponent {
  constructor(public dialogRef: DialogRef, @Inject(DIALOG_DATA) private data: Animal) {}

  get animal() {
    return this.data?.animal;
  }
}

export default {
  title: "Component Library/Dialogs/Service/Simple",
  component: StoryDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        DialogCloseDirective,
        SimpleDialogComponent,
        DialogTitleContainerDirective,
        StoryDialogContentComponent,
      ],
      imports: [ButtonModule, DialogModule],
      providers: [DialogService],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library",
    },
  },
} as Meta;

const Template: Story<StoryDialogComponent> = (args: StoryDialogComponent) => ({
  props: args,
});

export const Default = Template.bind({});

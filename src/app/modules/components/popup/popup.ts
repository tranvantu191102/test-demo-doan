import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-popup-container-component',
    standalone: true,
    templateUrl: './popup.html',
    imports: [CommonModule],
})

export class PopupContainerComponent {

    private _visible: boolean;
    @Input()
    get visible(): boolean {
        return this._visible
    }

    set visible(value: boolean){
        this._visible = value
        this.visibleChange.emit(value);
    }

    @Output() visibleChange = new EventEmitter<boolean>()

    @Input() width: number;
    @Input() height: number;
    @Input() title: string;


    onClose(){
        this.visible = false;
    }
}

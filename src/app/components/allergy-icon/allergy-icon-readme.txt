### AUTHOR: DANIEL FRANKORT ###
### COMPONENT DESCRIPTION ###
This can be used to easily display the image for an allergen.
Using this component and supplying the correct properties will result in an image of the supplied allergen.
When hovered over the image a tooltip appears saying "Contains traces of x".

### HOW TO USE ###

1) Import 'AllergyIconComponent' [ Typescript ]
    import { AllergyIconComponent } from '../allergy-icon/allergy-icon.component';
    
    ...
    @component{
        ...
        imports: [AllergyIconComponent, ...],
    }


2) Add component call in HTML-file [ HTML ]
    <app-allergy-icon></app-allergy-icon>
    
3) Add icon properties iconType / iconSize / withText
    Example:
        <app-allergy-icon [iconType]="'egg'" [iconSize]="'120px'" [withText]="True"></app-allergy-icon>
        
        This example will give you an icon showing the Egg-symbol (with text), with a size of 120px * 120px.

    ### Properties overview ###
    [iconType] : Set which image the symbol should have, accepts one of the 14 allergies.
        - celery
        - crustaceans
        - egg
        - fish
        - gluten
        - lupin
        - milk
        - molluscs
        - mustard
        - nuts
        - peanuts
        - sesame
        - soya
        - sulphite

    [iconSize] : Adjust the size of the image, automatically changes the height & width of the component.
        => Does not need to be entered, will default to '6vh'
        Can enter any value you would enter in css, (64px, 100%, 69rem, ...)

    [withText] : choose if the image is displayed with a text under it or not.
        => Input can be either TRUE or FALSE
            TRUE: Show grey text under the icon
            FALSE: Show only the icon
        => Default is FALSE (image without text)
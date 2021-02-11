# Button 
[Button.tsx](https://github.com/cockroachdb/ui/blob/master/packages/ui-components/src/Button/Button.tsx)

Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.
<br/><br/>

## Types

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_primary.png "Primary Type")


* Use a **primary button** to highlight the strongest call to action on a page. They are meant to look heavy in order to direct the user’s attention to the primary action on a page. 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_secondary.png "Secondary Type")


* Use a **secondary button** for actions that complement a primary action, or when there are multiple actions of equal weight. 


![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_tertiary.png "Tertiary Type")

* Use a **tertiary butto**n as an alternative to the secondary button for complementary actions. They can be used inline because they are different from content in style and recognizable as buttons alongside content.


![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_danger.png "Danger Type")

* Use a **danger button** for destructive actions like deleting. They indicate high severity and are meant to stand out so a user will proceed with caution.  


![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_external-link.png "External Link Type")

* Use an **external link** to open an external URL


![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/types_cta-link.png "CTA Link Type")

* Use a **CTA link** to perform an action within the application
<br/><br/>

## States

### Primary 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/states_primary.png "Primary States")


### Secondary 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/states_secondary.png "Secondary States")


### Tertiary 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/states_tertiary.png "Tertiary States")

### Danger 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/states_danger.png "Danger States")
<br/><br/>
## Formatting

### Anatomy 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/formatting_anatomy.png "Formatting Anatomy")


* **Text only:** Use to clearly describe the action.
* **Text + Icon:** Use an icon with text to convey more meaning. Icon can be left or right aligned.
* **Icon only:** Use sparingly to save space and never as the primary action. The icon should be easily understood.

### Sizes 

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/formatting_sizes.png "Formatting Sizes")


* **Default:** Use as the default button size when there is enough space
* **Small:** Use small to conserve space or when using button groups (eg. in table rows)

### Alignment

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/formatting_alignment.png "Formatting Alignment")


* **Fixed:** Fixed buttons are constricted to the size of their contents (eg. text or icons)
* **Fluid:** Fluid buttons can take the width of their container 

### Spacing

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/formatting_spacing.png "Formatting Spacing")

* **Button padding:** 16px padding around buttons
* **Button groups:** 8px spacing between buttons in button groups
<br/><br/>
## Best Practices

### Primary button

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_primary-1.png "Primary-1") ![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_primary-2.png "Primary-2")

* Use to indicate the main action on its own or within a group button set
* Should only appear once per container (not including modal dialogs)
* Not every screen requires a primary button

### Secondary button

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_secondary-1.png "Secondary-1") ![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_secondary-1.png "Secondary-2")

* Secondary buttons can be used alongside primary buttons or on their own
* Multiple secondary buttons can be used together as button groups

### Tertiary button

* TBD

### Danger button

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_danger-1.png "Danger-1") ![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_danger-1.png "Danger-2")

* Use to indicate high severity and that the user should proceed with caution 
* Accompany destructive actions with a confirmation step (are you sure you want to delete?) 


### External link

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_external-link-1 "External Link 1") ![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_external-link-2 "External Link 2")

* Set to open in a separate window  
* Can live on its own or within a body of text

### CTA link

![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_cta-link-1 "CTA Link 1") ![alt text](https://github.com/cockroachdb/ui/blob/master/docs/assets/practices_cta-link-2 "CTA Link 2")

* Can live on its own or within a body of text 
<br/><br/>
## Content Guidelines

* Use action verbs or phrases to tell the user what will happen next
* Limit button text to 1 or 2 words










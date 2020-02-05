# New play list section and lecture features

As of 26th of January 2020, the play list has been restructured and redefined, in order to provide a better user experience in a smaller form factor.

There are a lot of tiny things to do in order to achieve that.

## Section

### Display completed vs total lectures

As a user I want to be able to see how many lectures I have completed in a particular section and how many total lectures are in that section. This info should be present before the section title (to the left of it). Example: 
* 0/9 would suggest that there are 9 lectures in total in this section and 0 of them are completed
* 3/12 would suggest that there are 12 lectures in total in this section and 3 of them are completed
* 7/7 would suggest that there are 7 lectures in total in this section and all of them are completed

### Collapse section in playlist
As a user I want to be able to see a chevron pointing up or down, to the right of the section title. 

* When the chevron is pointing up, it indicates that the lecture list in this section is expanded and I can click on the chevron to collapse it and transitio the chevron to point down.
* When the chevron is pointing down, it indicates that the lecture list is hidden and I can click on the chevron to expand the list of lectures and transition the chevron to point up.

## Lecture

### Description of a lecture
As a user, when I visit the play list of a course, I want to be able to see a quick overview of the sections and lectures of the course. If a description of a lecture is present, I want to be able to toggle its visiblity on and off. By default all descriptions of lectures should be hidden.
* Hide the description of the lectures
* Implement a toggle button to show/hide the lecture description
* If a description is empty the toggle lecture description button should be either disabled or hidden.
* the state of the playlist shouldn't be saved for the user, hence a good idea is to implement these features using CSS only

### Reposition the picture preview

The picture preview is too small to provide any meaningful information and can make room for more relevant content to be presented. As a user I can get a suggestion about the lesson from the title of it and I can also get a better understanding if the expand description button allows me to view more info.
* remove the image from being displayed to the left of the title
* add the image as a tooltip when the user hovers with the mouse the lecture box and have it displayed to the left of the lecture. The tooltip should be big enough for the content of the image, especially the text, to be readable.

### Watched vs Completed
New properties and features will be added to the state that indicates the history interactions of a user with a lesson, on top of the ones already there: **lecture id**, **course id**, **user id**, **firestore document id** and **history**.

* a lesson will have by default a **completed** property with a value of _false_. A user can toggle this value to _true_ of _false_. When a user triggers this action, only the state of completed changes. The XP and CodeTap Merits will remain the same.
* upon reaching 100% watched event a lesson will be marked as completed. This event can reward the user with XP and CodeTap Merits, if certain conditions are met.
    * If the user stand-up is not present and validated for that day, this event will not reward any XP or CodeTap Merits.
    * If the user provided a stand-up update, and it has been validated, and no comments have been added, the default minimum XP will be rewarded and the CodeTap Merits will remain the same.
    * If the user provided a stand-up update, and it has been validated, and a minimum of two comments have been added as first time watched, or a minimum of 1 comment has been added as second or more times watched, the default XP for this event will be rewarded and CodeTap Merits will be affected by this event. This rewards will be affected by the multiplication daily bonus scheme factor.

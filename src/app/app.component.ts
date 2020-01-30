
// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";

interface IEditForm {
	id: string;
	name: string;
};

interface IAddForm {
	name: string;
}

@Component({
	selector: "my-app",
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	public addForm: IAddForm;
	public editForm: IEditForm;
	public friends: IFriend[];

	private friendService: FriendService;


	// I initialize the component.
	constructor( friendService: FriendService ) {
		
		this.friendService = friendService;

		this.addForm = {
			name: ""
		};
		this.editForm = {
			id: null,
			name: ""
		};
		this.friends = [];

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I delete the given friend from the list.
	public deleteFriend( friend: IFriend ) : void {

		this.friendService
			.deleteFriend( friend.id )
			.then(
				() : void => {

					this.loadFriends();

				},
				( error: Error ) : void => {

					console.log( "Error:", error );

				}
			)
		;

	}


	// I toggle the edit form for the given friend.
	public editFriend( friend: IFriend ) : void {

		// If the method is being called for the already-selected friend, then let's
		// toggle the form closed.
		if ( this.editForm.id === friend.id ) {

			this.editForm.id = null;
			this.editForm.name = "";

		} else {

			this.editForm.id = friend.id;
			this.editForm.name = friend.name;
			
		}

	}


	// I get called once after the component has been initialized and the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.loadFriends();

	}


	// I process the "add" form, creating a new friend with the given name.
	public processAddForm() : void {

		if ( ! this.addForm.name ) {

			return;

		}

		this.friendService
			.addFriend( this.addForm.name )
			.then(
				( id: string ) : void => {

					console.log( "New friend added:", id );

					this.loadFriends();
					this.addForm.name = "";

				},
				( error: Error ) : void => {

					console.log( "Error:", error );

				}
			)
		;

	}


	// I process the "edit" form, updating the selected friend with the given name.
	public processEditForm() : void {

		// If the name has been removed, then treat this as a "cancel".
		if ( ! this.editForm.name ) {

			this.editForm.id = null;
			this.editForm.name = "";
			return;			
			
		}

		this.friendService
			.updateFriend( this.editForm.id, this.editForm.name )
			.then(
				() : void => {

					this.editForm.id = null;
					this.editForm.name = "";
					this.loadFriends();

				},
				( error: Error ) : void => {

					console.log( "Error:", error );

				}
			)
		;

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I load the persisted friends collection into the list.
	private loadFriends() : void {

		this.friendService
			.getFriends()
			.then(
				( friends: IFriend[] ) : void => {

					// NOTE: Since the persistence layer is not returning the data 
					// in any particular order, we're going to explicitly sort the 
					// collection by name.
					this.friends = this.friendService.sortFriendsCollection( friends );

				},
				( error: Error ) : void => {

					console.log( "Error", error );

				}
			)
		;

	}

}
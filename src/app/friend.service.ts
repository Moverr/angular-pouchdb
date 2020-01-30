// Import the core angular services.
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
// import * as PouchDB from "pouchdb";

// Import RxJS modules for "side effects".
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

import * as PouchDB from 'pouchdb/dist/pouchdb';
import * as PouchDBUpsert from 'pouchdb-upsert/dist/pouchdb.upsert';


// Import the application components and services.
import { LocalStorageService } from "./local-storage.service";

export interface IFriend {
  id: number;
  name: string;
}


interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
	rows: IPouchDBRow[];
}

interface IPouchDBGetResult {
	_id: string;
	_rev: string;
}

interface IPouchDBPutResult {
	ok: boolean;
	id: string;
	rev: string;
}

interface IPouchDBRemoveResult {
	ok: boolean;
	id: string;
	rev: string;
}

interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };

	// Only included if include_docs is set to true during query.
	doc?: any; 
}

interface IPouchDBGetFriendResult extends IPouchDBGetResult {
	name: string;
}


@Injectable({
	providedIn: 'root',
})
export class FriendService {
  private localStorageService: LocalStorageService;
  private pouch: any;


  // I initialize the friend service.
  constructor(localStorageService: LocalStorageService) {
	this.localStorageService = localStorageService;
	
	this.pouch = new PouchDB( 
		"javascript-demos-pouchdb-angular2",
		{
			// PouchDB doesn't overwrite data - it creates revisions (like Git). 
			// For the purposes of this app, however, we don't need those revisions
			// to stay around, taking up storage space. By enabling auto_compaction,
			// PouchDB will only keep the most current revision in storage.
			auto_compaction: true
		}
	);

  }

  // ---
  // PUBLIC METHODS.
  // ---

  public sortFriendsCollection(friends: IFriend[]): IFriend[] {
    friends.sort(function(a: IFriend, b: IFriend): number {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });

    return friends;
  }

  public addFriend( name: string ) : Promise<string> {

	// NOTE: All friends are given the key-prefix of "friend:". This way, when we go
	// to query for friends, we can limit the scope to keys with in this key-space.
	var promise = this.pouch
		.put({
			_id: ( "friend:" + ( new Date() ).getTime() ),
			name: name
		})
		.then(
			( result: IPouchDBPutResult ) : string => {

				return( result.id );

			}
		)
	;

	return( promise );

}
  

  // I create a new friend with the given name and return the new observable id.
  public createFriend(name: string): Observable<number> {
    var friends = this.loadFriends();
    var friend = {
      id: new Date().getTime(),
      name: name
    };

    this.localStorageService.setItem("friends", friends.concat(friend));

    return Observable.of(friend.id);
  }


  // I return an observable collection of friends.
  public getFriends(): Observable<IFriend[]> {
    return Observable.of(this.loadFriends());
  }

  // I remove the friend with the given id. Returns an observable confirmation.
  public removeFriend(id: number): Observable<void> {
    var friends = this.loadFriends();
    var friendIndex = friends.findIndex((item: IFriend): boolean => {
      return item.id === id;
    });

    if (friendIndex >= 0) {
      friends = friends.slice();
      friends.splice(friendIndex, 1);

      this.localStorageService.setItem("friends", friends);

      return Observable.of(null);
    } else {
      return Observable.throw(new Error("Not Found"));
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  // I load the friends collection from the persistent storage.
  private loadFriends(): IFriend[] {
    var friends = <IFriend[]>this.localStorageService.getItem("friends");

    return friends || [];
  }
}

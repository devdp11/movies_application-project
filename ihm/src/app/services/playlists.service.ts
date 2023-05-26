import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { error } from 'console';


export interface Movie {
  id: string;
  title: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  
  private watchLaterList: {id: string, title: string, img: string}[] = [];
  private storageInstance: Storage | null = null;
  readonly STORAGE_KEY = 'watchLaterList';
  
  constructor(private storage: Storage) {
    this.initStorage();
   }

   private async initStorage(){
      this.storageInstance = await this.storage.create();
      const storedList = await this.storageInstance.get(this.STORAGE_KEY);
      this.watchLaterList = storedList ? JSON.parse(storedList) : [];
   }

  addWatchLaterList(id: string, title: string, img: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const existingMovie = this.watchLaterList.find(movie => movie.id === id);
      if (existingMovie) {
        console.log('The nome is already in the watch later playlist');
        resolve();
      } else {
        this.watchLaterList.push({ id, title, img });
        this.saveData()
          .then(() => {
            console.log('Movie added to the watch later playlist | ', id);
            resolve();
          })
          .catch(error => {
            console.error('Error adding the movie to the list', error);
            resolve();
          });
      }
    });
  }

  private async saveData() {
    if (this.storageInstance) {
      await this.storageInstance.set(this.STORAGE_KEY, JSON.stringify(this.watchLaterList));
    }
  }

  async getPlaylistMovies(): Promise<{ id: string, title: string, img: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
  
    const StoredMovies = this.watchLaterList;
    console.log(StoredMovies);
    return StoredMovies;
  }

  async removeMoviesPlaylist(movie: Movie) {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const index = this.watchLaterList.findIndex(m => m.id === movie.id);
    if (index > -1) {
      this.watchLaterList.splice(index, 1);
      await this.saveData();
      console.log('Movie removed from playlist', movie);
    }
  }

}
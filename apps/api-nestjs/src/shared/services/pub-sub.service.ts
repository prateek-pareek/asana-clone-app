import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

/**
 * Pub/Sub service for real-time subscriptions
 */
@Injectable()
export class PubSubService {
  private pubSub: PubSub;

  constructor() {
    this.pubSub = new PubSub();
  }

  /**
   * Publish an event
   */
  async publish<T>(eventName: string, payload: T): Promise<void> {
    await this.pubSub.publish(eventName, payload);
  }

  /**
   * Subscribe to an event
   */
  asyncIterator<T>(eventName: string): AsyncIterator<T> {
    return this.pubSub.asyncIterator<T>(eventName);
  }

  /**
   * Subscribe to an event with filter
   */
  asyncIteratorWithFilter<T>(
    eventName: string,
    filter: (payload: T) => boolean
  ): AsyncIterator<T> {
    return this.pubSub.asyncIterator<T>(eventName, {
      filter: (payload: T) => filter(payload)
    });
  }

  /**
   * Get the underlying PubSub instance
   */
  getPubSub(): PubSub {
    return this.pubSub;
  }
}
